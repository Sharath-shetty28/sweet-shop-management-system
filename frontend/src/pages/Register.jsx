import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { NotebookIcon } from "lucide-react";
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
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register, isSigningUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const features = [
    { icon: Check, text: "Wide variety of sweets & treats" },
    { icon: Check, text: "Fast & secure delivery" },
    { icon: Check, text: "Exclusive member discounts" },
    { icon: Check, text: "24/7 customer support" },
  ];

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name cannot be empty ");
      return;
    }
    if (!formData.name.match(/^[a-zA-Z\s]+$/)) {
      toast.error("Name can only contain letters and spaces ");
      return;
    }
    if (!formData.name || formData.name.length < 3) {
      toast.error("Name must be at least 3 characters long ");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email cannot be empty ");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password cannot be empty ");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long ");
      return;
    }

    const result = await register(formData);
    if (result && result.success) {
      navigate("/");
      toast.success("Account created successfully!");
    } else {
      toast.error(result.message || "Please try again");
    }

    setFormData({ name: "", email: "", password: "" });
  };

  return (
    // <div className="w-full flex items-center justify-center p-4 bg-slate-900">
    //   <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
    //     <div className="w-full flex flex-col md:flex-row">
    //       {/* FORM CLOUMN - LEFT SIDE */}
    //       <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
    //         <div className="w-full max-w-md">
    //           {/* HEADING TEXT */}
    //           <div className="text-center mb-8">
    //             <NotebookIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
    //             <h2 className="text-2xl font-bold text-slate-200 mb-2">
    //               Create Account
    //             </h2>
    //             <p className="text-slate-400">Sign up for a new account</p>
    //           </div>

    //           {/* FORM */}
    //           <form onSubmit={handleSubmit} className="space-y-6">
    //             {/* FULL NAME */}
    //             <div>
    //               <label className="auth-input-label">Full Name</label>
    //               <div className="relative">
    //                 <UserIcon className="auth-input-icon" />

    //                 <input
    //                   name="name"
    //                   type="text"
    //                   value={formData.name}
    //                   onChange={handleChange}
    //                   className="input"
    //                   placeholder="John Doe"
    //                 />
    //               </div>
    //             </div>

    //             {/* EMAIL INPUT */}
    //             <div>
    //               <label className="auth-input-label">Email</label>
    //               <div className="relative">
    //                 <MailIcon className="auth-input-icon" />

    //                 <input
    //                   name="email"
    //                   type="email"
    //                   value={formData.email}
    //                   onChange={handleChange}
    //                   className="input"
    //                   placeholder="johndoe@gmail.com"
    //                 />
    //               </div>
    //             </div>

    //             {/* PASSWORD INPUT */}
    //             <div>
    //               <label className="auth-input-label">Password</label>
    //               <div className="relative">
    //                 <LockIcon className="auth-input-icon" />

    //                 <input
    //                   name="password"
    //                   aria-label="Password"
    //                   autoComplete="current-password"
    //                   type={showPassword ? "text" : "password"}
    //                   value={formData.password}
    //                   onChange={handleChange}
    //                   className="input"
    //                   placeholder="Enter your password"
    //                 />
    //                 <button
    //                   type="button"
    //                   onClick={() => setShowPassword((s) => !s)}
    //                   className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
    //                   aria-pressed={showPassword}
    //                   aria-label={
    //                     showPassword ? "Hide password" : "Show password"
    //                   }
    //                 >
    //                   {/* Eye icon when hidden; eye-off when visible */}
    //                   {showPassword ? (
    //                     // eye-off / closed eye
    //                     <EyeOff />
    //                   ) : (
    //                     // eye / open eye
    //                     <Eye />
    //                   )}
    //                 </button>
    //               </div>
    //             </div>

    //             {/* SUBMIT BUTTON */}
    //             <button
    //               className="auth-btn"
    //               type="submit"
    //               disabled={isSigningUp}
    //             >
    //               {isSigningUp ? (
    //                 <LoaderIcon className="w-full h-5 animate-spin text-center" />
    //               ) : (
    //                 "Create Account"
    //               )}
    //             </button>
    //           </form>

    //           <div className="mt-6 text-center">
    //             <Link to="/" className="auth-link">
    //               Already have an account? Login
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-200"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

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
                  disabled={isSigningUp}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSigningUp ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <a
                    href="/"
                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                  >
                    Login here
                  </a>
                </p>
              </div>

              {/* Social Login */}
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

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-black mb-1">500+</div>
                  <div className="text-white/80 text-sm font-medium">
                    Products
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black mb-1">10K+</div>
                  <div className="text-white/80 text-sm font-medium">
                    Customers
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black mb-1">4.9★</div>
                  <div className="text-white/80 text-sm font-medium">
                    Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
