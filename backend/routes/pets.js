import express from "express";
import Pet from "../models/Pet.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

export default router;
