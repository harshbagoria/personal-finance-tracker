
import express from "express";
import authMiddleware from "../../Middleware/authMiddleware.js";
import dotenv from 'dotenv';




dotenv.config();
const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Middleware is working!",
    user: req.user
  });
});

export default router;
