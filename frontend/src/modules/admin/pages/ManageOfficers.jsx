import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

const ManageOfficers = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/officers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOfficers(res.data.officers);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch officers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this officer?")) return;

    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/officers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(res.data.message);

      fetchOfficers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete officer");
    }
  };

  const filteredOfficers = useMemo(() => {
    return officers.filter((officer) => {
      const text = search.toLowerCase();

      return (
        officer.officerId?.toLowerCase().includes(text) ||
        officer.city?.toLowerCase().includes(text) ||
        officer.state?.toLowerCase().includes(text) ||
        officer.wardNo?.toString().includes(text)
      );
    });
  }, [officers, search]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Officers</h1>

        <div className="relative mt-4 md:mt-0">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search Officer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 pr-4 py-3 border rounded-lg w-80 bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Officer ID</th>
              <th className="px-6 py-4 text-left">Initial Password</th>
              <th className="px-6 py-4 text-left">Ward</th>
              <th className="px-6 py-4 text-left">City</th>
              <th className="px-6 py-4 text-left">State</th>
              <th className="px-6 py-4 text-left">Created</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  Loading officers...
                </td>
              </tr>
            ) : filteredOfficers.length ? (
              filteredOfficers.map((officer) => (
                <tr key={officer._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">
                    {officer.officerId}
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-gray-100 px-3 py-1 rounded">
                      {officer.intialPassword}
                    </span>
                  </td>

                  <td className="px-6 py-4">Ward {officer.wardNo}</td>

                  <td className="px-6 py-4">{officer.city}</td>

                  <td className="px-6 py-4">{officer.state}</td>

                  <td className="px-6 py-4">
                    {new Date(officer.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleDelete(officer._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No officers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOfficers;
