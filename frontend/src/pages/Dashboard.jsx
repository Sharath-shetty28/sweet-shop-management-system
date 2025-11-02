import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import SweetCard from "../components/SweetCard";
import SweetSearch from "../components/SweetSearch";

const Dashboard = () => {
  const { authUser } = useAuth();
  const [sweets, setSweets] = useState([]);

  const fetchSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
    fetchSweets();
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🍬 Sweet Shop Dashboard</h1>
      <SweetSearch setSweets={setSweets} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sweets.map((sweet) => (
          <SweetCard
            key={sweet._id}
            sweet={sweet}
            user={authUser}
            refresh={fetchSweets}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
