import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function adminAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied: admin only" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
}
