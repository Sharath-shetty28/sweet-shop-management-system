import api from "../api/axios";
import { toast } from "react-toastify";

const SweetCard = ({ sweet, user, refresh }) => {
  const purchase = async () => {
    try {
      await api.post(
        `/sweets/${sweet._id}/purchase`,
        { qty: 1 },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      toast.success("Purchased successfully!");
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error purchasing");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold">{sweet.name}</h3>
      <p>Category: {sweet.category}</p>
      <p>Price: ₹{sweet.price}</p>
      <p>Stock: {sweet.quantity}</p>
      <button
        onClick={purchase}
        disabled={!user || sweet.quantity === 0}
        className={`mt-2 px-4 py-2 rounded text-white ${
          sweet.quantity > 0 ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        {sweet.quantity > 0 ? "Buy" : "Out of Stock"}
      </button>
    </div>
  );
};

export default SweetCard;
