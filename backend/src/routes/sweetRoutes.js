// src/routes/sweetRoutes.js
import express from "express";
import {
  addSweet,
  listSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from "../controllers/sweetController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public read
router.get("/", listSweets);
router.get("/search", searchSweets);

// Protected actions
router.post("/", protect, adminOnly, addSweet); // admin only to add
router.put("/:id", protect, adminOnly, updateSweet); // admin to update
router.delete("/:id", protect, adminOnly, deleteSweet); // admin to delete

// Purchase (customers & admins)
router.post("/:id/purchase", protect, purchaseSweet);

// Restock (admin only)
router.post("/:id/restock", protect, adminOnly, restockSweet);

export default router;
