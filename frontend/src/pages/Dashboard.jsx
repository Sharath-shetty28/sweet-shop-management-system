import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import SweetCard from "../components/SweetCard";
import SweetSearch from "../components/SweetSearch";
import { Search, ShoppingCart, Package, Sparkles } from "lucide-react";

const Dashboard = () => {
  const { authUser } = useAuth();
  const [sweets, setSweets] = useState([]);
  const { logout } = useAuth();

  const fetchSweets = async () => {
    const res = await api.get("/sweets");
    if (res.data.success) {
      setSweets(res.data.sweets);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Header */}
      <header className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white tracking-tight">
                  SweetShop
                </h1>
                <p className="text-indigo-100 text-sm font-medium">
                  Your happiness delivered
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setAuthUser(!authUser)}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg ${
                  authUser
                    ? "bg-white text-indigo-600"
                    : "bg-white/20 backdrop-blur-sm text-white border-2 border-white/30"
                }`}
              >
                {authUser ? "👋 Welcome" : "Login / Signup"}
              </button>
              <div className="relative">
                <button
                  onClick={logout}
                  className="bg-amber-300 backdrop-blur-sm border-2 border-white/30 p-3 rounded-xl hover:bg-white/30 transition-all"
                >
                  logout
                </button>
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              Discover Sweet Happiness 🍭
            </h2>
            <p className="text-xl text-indigo-100 font-medium max-w-2xl mx-auto mt-16">
              Explore our collection of handcrafted sweets and treats <br></br>
              that bring joy to every moment
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Search Bar */}
        <div className="mb-10">
          <SweetSearch setSweets={setSweets} />
        </div>

        {/* Products Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">Featured Sweets</h3>
          <p className="text-gray-600 font-medium">
            {sweets.length} products found
          </p>
        </div>

        {sweets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No sweets found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                user={authUser}
                refresh={fetchSweets}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-300" />
                <h3 className="text-2xl font-black">SweetShop</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Bringing sweetness to your life, one treat at a time.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-3">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Special Offers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>
              © 2025 SweetShop. All rights reserved. Made with ❤️ for sweet
              lovers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
