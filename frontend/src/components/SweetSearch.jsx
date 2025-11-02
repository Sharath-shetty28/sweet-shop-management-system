import { useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const SweetSearch = ({ setSweets }) => {
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetch = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const res = await api.get("/sweets/search", { params: filters });
      if (res.data.success) {
        setSweets(res.data.sweets);
        toast.success(`${res.data.count} sweets found`);
      }
    } catch (err) {
      toast.error("Search failed");
      console.error(err);
    }
  };

  const handleReset = async () => {
    setFilters({ name: "", category: "", minPrice: "", maxPrice: "" });
    fetch();
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow flex flex-wrap gap-3 items-center">
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="Search by name"
        className="border rounded-lg px-3 py-2 w-40"
      />
      <input
        type="text"
        name="category"
        value={filters.category}
        onChange={handleChange}
        placeholder="Category"
        className="border rounded-lg px-3 py-2 w-40"
      />
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleChange}
        placeholder="Min Price"
        className="border rounded-lg px-3 py-2 w-32"
      />
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleChange}
        placeholder="Max Price"
        className="border rounded-lg px-3 py-2 w-32"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Search
      </button>
      <button
        onClick={handleReset}
        className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
      >
        Reset
      </button>
    </div>
  );
};

export default SweetSearch;
