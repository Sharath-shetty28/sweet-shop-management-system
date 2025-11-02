import { useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import SweetSearch from "../components/SweetSearch";

const AdminPanel = () => {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const fetch = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

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
        fetch();
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
        fetch();
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
        ...form,
        name: newName,
        category: newCategory,
        price: newPrice,
      });
      if (response.data.success) {
        toast.success("Sweet updated successfully");
        fetch();
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
        fetch();
      }
    } catch (err) {
      console.log(err);
      toast.error("Error restocking sweet");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 ">Admin Panel</h2>
      <form
        onSubmit={handleAdd}
        className="mb-6 grid grid-cols-2 gap-2 max-w-lg"
      >
        {["name", "category", "price", "quantity"].map((f) => (
          <input
            key={f}
            placeholder={f}
            className="border p-2"
            value={form[f]}
            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            required
          />
        ))}
        <button className="bg-blue-500 text-white py-2 col-span-2">
          Add Sweet
        </button>
      </form>

      <SweetSearch setSweets={setSweets} />

      <h3 className="font-semibold mb-2 ">Existing Sweets:</h3>
      {sweets.length === 0 ? (
        <p>No sweets available.</p>
      ) : (
        <ul>
          {sweets.map((sweet) => (
            <li
              key={sweet._id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                {sweet.name} - {sweet.category} - ${sweet.price} - Qty:{" "}
                {sweet.quantity}
              </div>
              <button
                onClick={() => updateSweet(sweet._id, sweet)}
                className="bg-yellow-500 text-white px-3 py-1"
              >
                Update
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1"
                onClick={() => restockSweet(sweet._id, sweet)}
              >
                Restock
              </button>
              <button
                onClick={() => deleteSweet(sweet._id)}
                className="bg-red-500 text-white px-3 py-1"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
