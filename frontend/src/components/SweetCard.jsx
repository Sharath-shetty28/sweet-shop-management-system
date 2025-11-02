import api from "../api/axios";
import { toast } from "react-toastify";
import { Package, AlertCircle, Tag, IndianRupee } from "lucide-react";

const SweetCard = ({ sweet, user, refresh }) => {
  const isOutOfStock = sweet.quantity === 0;
  const isLowStock = sweet.quantity > 0 && sweet.quantity < 10;
  const canPurchase = user && !isOutOfStock;

  const purchase = async () => {
    try {
      const quantity = 1; // Default purchase quantity
      const res = await api.post(`/sweets/${sweet._id}/purchase`, { quantity });
      if (res.data.success) {
        toast.success(res.data.message);
        refresh();
      } else {
        toast.error("Purchase failed. Please try again.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Purchase failed. Please try again."
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-indigo-200">
      {/* Header Badge */}
      <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

        {isOutOfStock && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Out of Stock
          </div>
        )}

        {isLowStock && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">
            <AlertCircle className="w-3 h-3" />
            Low Stock
          </div>
        )}

        <div className="relative z-10">
          <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-black mb-1 tracking-tight">
            {sweet.name}
          </h3>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <span className="text-white/90 text-sm font-semibold capitalize">
              {sweet.category}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price Display */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1 mb-2">
            <IndianRupee className="w-6 h-6 text-gray-700" />
            <span className="text-4xl font-black text-gray-900">
              {sweet.price}
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Per unit price</p>
        </div>

        {/* Stock Information */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">
                Available Stock
              </span>
            </div>
            <span
              className={`text-2xl font-bold ${
                isOutOfStock
                  ? "text-red-600"
                  : isLowStock
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              {sweet.quantity}
            </span>
          </div>
          {isLowStock && !isOutOfStock && (
            <p className="text-xs text-orange-600 font-medium mt-2">
              Only {sweet.quantity} left in stock!
            </p>
          )}
        </div>

        {/* Purchase Button */}
        <button
          onClick={purchase}
          disabled={!canPurchase}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
            canPurchase
              ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:scale-[1.02] active:scale-95"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {!user ? (
            <>
              <AlertCircle className="w-5 h-5" />
              Please Login to Buy
            </>
          ) : isOutOfStock ? (
            <>
              <AlertCircle className="w-5 h-5" />
              Out of Stock
            </>
          ) : (
            <>Buy</>
          )}
        </button>

        {/* Additional Info */}
        {canPurchase && (
          <p className="text-center text-xs text-gray-500 mt-3 font-medium">
            ✨ Free delivery on orders above ₹500
          </p>
        )}
      </div>
    </div>
  );
};

export default SweetCard;
