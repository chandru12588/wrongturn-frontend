import React, { useEffect, useState } from "react";
import axios from "axios";
import { Boxes, PlusCircle } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    packages: 0,
    bookings: 0,
    users: 0,
  });

  const token = localStorage.getItem("admin_token");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const pkgRes = await axios.get(`${API}/api/admin/packages`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats({
        packages: pkgRes.data.length,
        bookings: 128, // dummy for now
        users: 452,    // dummy for now
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        Welcome Admin 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border rounded-xl p-6 shadow-md">
          <p className="text-gray-500">Total Packages</p>
          <div className="text-4xl font-bold text-indigo-600 mt-2">
            {stats.packages}
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-md">
          <p className="text-gray-500">Bookings</p>
          <div className="text-4xl font-bold text-indigo-600 mt-2">
            {stats.bookings}
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-md">
          <p className="text-gray-500">Users</p>
          <div className="text-4xl font-bold text-indigo-600 mt-2">
            {stats.users}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="/admin/packages"
          className="bg-white border rounded-xl p-8 shadow-lg hover:shadow-xl transition group"
        >
          <div className="flex items-center gap-4">
            <Boxes size={36} className="text-indigo-600" />
            <div>
              <h2 className="text-xl font-semibold group-hover:text-indigo-600">
                Manage Packages
              </h2>
              <p className="text-gray-500">View, update or delete packages</p>
            </div>
          </div>
        </a>

        <a
          href="/admin/packages/new"
          className="bg-white border rounded-xl p-8 shadow-lg hover:shadow-xl transition group"
        >
          <div className="flex items-center gap-4">
            <PlusCircle size={36} className="text-indigo-600" />
            <div>
              <h2 className="text-xl font-semibold group-hover:text-indigo-600">
                Add New Package
              </h2>
              <p className="text-gray-500">Create a new travel package</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
