import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/is-auth", { withCredentials: true });
        if (res.data.success) {
          setAuthUser(res.data.user);
        }
      } catch (err) {
        console.log("Auth check error:", err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const isAdmin = () => authUser?.role === "admin";

  const register = async (data) => {
    setIsSigningUp(true);
    try {
      const res = await api.post("/auth/register", data);
      if (!res.data.success) {
        return { success: false, message: res.data.message };
      }
      setAuthUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || "Signup failed" };
    } finally {
      setIsSigningUp(false);
    }
  };

  const login = async (data) => {
    setIsLoggingIn(true);
    try {
      const res = await api.post("/auth/login", data);
      if (res.data.success) {
        setAuthUser(res.data.user);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      console.log("Login error:", err);
      return { success: false, message: err.message || "Login failed" };
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");
      if (res.data.success) {
        setAuthUser(null);
      }

      toast.success("Logged out successfully!");
      return { success: true };
    } catch (err) {
      toast.error("Logout failed");
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        register,
        login,
        logout,
        isAdmin,
        isLoggingIn,
        isSigningUp,
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
