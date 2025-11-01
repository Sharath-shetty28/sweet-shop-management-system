// src/models/Sweet.js
import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Sweet", sweetSchema);
