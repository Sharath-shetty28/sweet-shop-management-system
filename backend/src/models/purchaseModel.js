import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sweet: { type: mongoose.Schema.Types.ObjectId, ref: "Sweet", required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true },
  purchasedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Purchase", purchaseSchema);
