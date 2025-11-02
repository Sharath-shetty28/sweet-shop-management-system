import axios from "axios";

// const api = axios.create({
//   baseURL: [
//     "http://localhost:5000/api",
//     "https://sweet-shop-management-system-t7w1.onrender.com/api",
//   ], // your backend
//   withCredentials: true,
// });

// export default api;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
export default api;
