import { useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import SweetSearch from "../components/SweetSearch";
import {
  Plus,
  Edit2,
  Package,
  Trash2,
  Search,
  Sparkles,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const AdminPanel = () => {
  const { logout } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const fetch = async () => {
    const res = await api.get("/sweets");
    if (res.data.success) {
      setSweets(res.data.sweets);
    }
  };

  const totalInventory = (sweets || []).reduce(
    (sum, s) => sum + (s.quantity || 0),
    0
  );
  const totalValue = (sweets || []).reduce(
    (sum, s) => sum + (s.price * s.quantity || 0),
    0
  );
  const lowStockItems = (sweets || []).filter((s) => s.quantity < 20).length;

  useEffect(() => {
    fetch();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/sweets", { ...form });
      if (response.data.success) {
        toast.success("Sweet added successfully");
        setForm({ name: "", category: "", price: "", quantity: "" });
        setSweets([...sweets, response.data.sweet]);
      }
    } catch (err) {
      toast.error("Error adding sweet");
    }
  };

  const deleteSweet = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) {
      return;
    }
    try {
      const response = await api.delete(`/sweets/${id}`);
      if (response.data.success) {
        toast.success("Sweet deleted successfully");
        setSweets(sweets.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting sweet");
    }
  };

  const updateSweet = async (id, sweet) => {
    const newName = prompt("Enter new name:", sweet.name);
    const newCategory = prompt("Enter new category:", sweet.category);
    const newPrice = prompt("Enter new price:", sweet.price);

    // 🧠 Validate inputs
    if (!newName || !newCategory || isNaN(newPrice)) {
      toast.error("Invalid input — please enter valid details!");
      return;
    }

    if (isNaN(newPrice)) return; // Cancelled or invalid input
    try {
      const response = await api.put(`/sweets/${id}`, {
        name: newName,
        category: newCategory,
        price: newPrice,
        quantity: sweet.quantity,
      });
      if (response.data.success) {
        toast.success("Sweet updated successfully");
        setSweets(
          sweets.map((s) =>
            s._id === id ? { ...s, ...response.data.sweet } : s
          )
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Error updating sweet");
    }
  };

  const restockSweet = async (id, sweet) => {
    const addQuantity = prompt("Enter quantity to restock:", "0");
    if (isNaN(addQuantity) || addQuantity === null) return;

    try {
      const response = await api.put(`/sweets/${id}`, {
        ...sweet,
        quantity: parseInt(sweet.quantity) + parseInt(addQuantity),
      });
      if (response.data.success) {
        toast.success("Sweet restocked successfully");
        setSweets(
          sweets.map((s) =>
            s._id === id ? { ...s, quantity: response.data.sweet.quantity } : s
          )
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Error restocking sweet");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Premium Header */}

      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight flex items-center gap-3">
                <Sparkles className="w-10 h-10 text-yellow-300" />
                SweetShop
              </h1>
              <p className="text-indigo-100 text-lg font-medium">
                Professional Inventory Management
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={logout}
                className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 rounded-xl text-indigo-900 font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Total Items
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {totalInventory}
                </p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-xl">
                <Package className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Inventory Value
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  ${totalValue.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Low Stock Alert
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {lowStockItems}
                </p>
              </div>
              <div className="bg-orange-100 p-4 rounded-xl">
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Sweet Form */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Add New Sweet</h2>
          </div>

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sweet Name
                </label>
                <input
                  placeholder="e.g., Chocolate Truffle"
                  type="text"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <input
                  placeholder="e.g., chocolate, candy"
                  type="text"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  placeholder="0"
                  type="number"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Add Sweet to Inventory
            </button>
          </form>
        </section>

        {/* Search Section */}
        <section className="mb-8">
          <SweetSearch setSweets={setSweets} />
        </section>

        {/* Sweets Inventory */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Package className="w-7 h-7 text-indigo-600" />
              Current Inventory
            </h3>
            <span className="text-sm text-gray-500 font-medium">
              {sweets.length} products
            </span>
          </div>

          {sweets.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">
                No sweets in inventory
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Add your first sweet to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sweets.map((sweet) => (
                <div
                  key={sweet._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 border border-gray-100 hover:border-indigo-200 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors">
                        {sweet.name}
                      </h4>
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold capitalize">
                        {sweet.category}
                      </span>
                    </div>
                    {sweet.quantity < 20 && (
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Price</span>
                      <span className="text-2xl font-bold text-gray-800">
                        ${sweet.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Stock</span>
                      <span
                        className={`text-lg font-bold ${
                          sweet.quantity < 20
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      >
                        {sweet.quantity} units
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => updateSweet(sweet._id, sweet)}
                      className="flex flex-col items-center gap-1 p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-200 group"
                    >
                      <Edit2 className="w-5 h-5" />
                      <span className="text-xs font-semibold">Edit</span>
                    </button>
                    <button
                      onClick={() => restockSweet(sweet._id, sweet)}
                      className="flex flex-col items-center gap-1 p-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-all duration-200"
                    >
                      <Package className="w-5 h-5" />
                      <span className="text-xs font-semibold">Restock</span>
                    </button>
                    <button
                      onClick={() => deleteSweet(sweet._id)}
                      className="flex flex-col items-center gap-1 p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span className="text-xs font-semibold">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© 2025 SweetShop Admin Panel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminPanel;
