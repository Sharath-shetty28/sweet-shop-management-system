// src/controllers/sweetController.js
import Sweet from "../models/sweet.js";

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
    const { q, category, minPrice, maxPrice } = req.query;

    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const results = await Sweet.find(filter);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSweet = async (req, res) => {
  try {
    const updated = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Sweet not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSweet = async (req, res) => {
  try {
    const deleted = await Sweet.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Sweet not found" });
    res.json({ message: "Sweet deleted successfully" });
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

    sweet.quantity -= Number(quantity);
    await sweet.save();
    res.json({
      message: "Purchase successful",
      remainingQuantity: sweet.quantity,
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
    res.json({ message: "Restock successful", newQuantity: sweet.quantity });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
