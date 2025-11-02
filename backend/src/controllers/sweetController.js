// src/controllers/sweetController.js
import Sweet from "../models/sweetModel.js";
import Purchase from "../models/purchaseModel.js";

export const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || !price || !quantity)
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });

    if (price < 0 || quantity < 0) {
      return res.status(400).json({ message: "Invalid price or quantity" });
    }

    const exists = await Sweet.findOne({ name });
    if (exists)
      return res.status(400).json({ message: "Sweet with same name exists" });

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
    });
    res.status(201).json({ success: true, sweet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    if (!sweets || sweets.length === 0) {
      return res.status(404).json({ message: "No sweets found" });
    }
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    // 🧠 Build dynamic filter object
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" }; // case-insensitive match
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);

    res.status(200).json({
      success: true,
      count: sweets.length,
      sweets,
    });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const updateSweet = async (req, res) => {
  try {
    const updated = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Sweet not found" });
    res.json({ success: true, sweet: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSweet = async (req, res) => {
  try {
    const deleted = await Sweet.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Sweet not found" });
    res.json({ success: true, message: "Sweet deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const purchaseSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity <= 0)
      return res.status(400).json({ message: "Invalid quantity" });

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    if (sweet.quantity < quantity)
      return res.status(400).json({ message: "Insufficient stock" });

    // Deduct stock
    sweet.quantity -= quantity;
    await sweet.save();
    // Create purchase record
    const purchase = await Purchase.create({
      user: req.user.id,
      sweet: sweet.id,
      category: sweet.category,
      quantity,
      totalPrice: sweet.price * quantity,
    });

    res.json({
      success: true,
      message: "Purchase successful",
      remainingQuantity: sweet.quantity,
      purchase,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity <= 0)
      return res.status(400).json({ message: "Invalid quantity" });

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    sweet.quantity += Number(quantity);
    await sweet.save();
    res.json({
      success: true,
      message: "Restock successful",
      newQuantity: sweet.quantity,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
