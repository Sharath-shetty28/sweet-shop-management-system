import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ShoppingBag,
  Loader,
  ArrowRight,
  Check,
} from "lucide-react";
function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const features = [
    { icon: Check, text: "Wide variety of sweets & treats" },
    { icon: Check, text: "Fast & secure delivery" },
    { icon: Check, text: "Exclusive member discounts" },
    { icon: Check, text: "24/7 customer support" },
  ];
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Email cannot be empty 🚨");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password cannot be empty 🚨");
      return;
    }

    const result = await login(formData);
    if (result && result.success) {
      navigate("/admin");
      toast.success("Logged in successfully!");
    } else {
      toast.error(result.message || "Please try again");
    }

    setFormData({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-6xl bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
        <div className="w-full flex flex-col md:flex-row">
          {/* LEFT SIDE - FORM */}
          <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center relative z-10">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">
                  Join SweetShop
                </h2>
                <p className="text-slate-400 font-medium">
                  Create your account and start shopping
                </p>
              </div>

              {/* Form */}
              <div onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-200"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-3.5 bg-slate-900/50 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-200"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Must be at least 6 characters
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  type="button"
                  disabled={isLoggingIn}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isLoggingIn ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Login
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-slate-400">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                  >
                    Register here
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - BRANDING */}
          <div className="md:w-1/2 bg-gradient-to-br from-purple-600 to-pink-600 p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center text-white">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl mb-8 shadow-2xl">
                <ShoppingBag className="w-12 h-12" />
              </div>

              {/* Heading */}
              <h3 className="text-4xl font-black mb-4 leading-tight">
                Welcome to
                <br />
                SweetShop
              </h3>
              <p className="text-white/90 text-lg mb-12 max-w-md mx-auto font-medium">
                Join thousands of happy customers enjoying the sweetest treats
                delivered to your doorstep
              </p>

              {/* Features */}
              <div className="space-y-4 text-left max-w-sm mx-auto">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
