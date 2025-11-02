import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const { user } = useAuth();
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
      await api.post("/sweets", form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Sweet added!");
      fetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding");
    }
  };

  const deleteSweet = async (id) => {
    await api.delete(`/sweets/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    toast.info("Sweet deleted");
    fetch();
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

      <h3 className="font-semibold mb-2 ">Existing Sweets:</h3>
      {sweets.map((s) => (
        <div key={s._id} className="border p-2 mb-2 flex justify-between">
          <div>
            {s.name} - ₹{s.price} (Qty: {s.quantity})
          </div>
          <button
            onClick={() => deleteSweet(s._id)}
            className="bg-red-500 text-white px-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
