import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import SweetCard from "../components/SweetCard";

const Dashboard = () => {
  const { user } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [query, setQuery] = useState("");

  const fetchSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  const searchSweets = async (q) => {
    const res = await api.get(`/sweets/search?q=${q}`);
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🍬 Sweet Shop Dashboard</h1>
      <input
        type="text"
        placeholder="Search sweets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={() => searchSweets(query)}
        className="border p-2 mb-4 w-full max-w-sm"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sweets.map((sweet) => (
          <SweetCard
            key={sweet._id}
            sweet={sweet}
            user={user}
            refresh={fetchSweets}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
