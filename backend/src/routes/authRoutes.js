import express from "express";
import {
  registerUser,
  loginUser,
  isAuth,
  logout,
} from "../controllers/authController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/is-auth", protect, isAuth);
router.post("/logout", protect, logout);

export default router;
