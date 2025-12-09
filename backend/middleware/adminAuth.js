import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export default async function adminAuth(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "Missing token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== "admin") return res.status(403).json({ msg: "Forbidden" });

    // Optionally check admin exists
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) return res.status(403).json({ msg: "Admin not found" });

    req.admin = admin;
    next();
  } catch (err) {
    console.error("ADMIN AUTH ERROR:", err);
    return res.status(401).json({ msg: "Invalid token" });
  }
}
