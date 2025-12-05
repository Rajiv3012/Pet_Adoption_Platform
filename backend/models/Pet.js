import express from "express";
import Pet from "../models/Pet.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    console.log("PETS ERROR:", error);
    res.status(500).json({ msg: "Error fetching pets" });
  }
});

export default router;
