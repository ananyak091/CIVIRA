import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { State, City } from "country-state-city";

const CreateOfficer = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [wardAvailable, setWardAvailable] = useState(null);

  const [formData, setFormData] = useState({
    state: "",
    city: "",
    wardNo: "",
  });

  useEffect(() => {
    setStates(State.getStatesOfCountry("IN"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      const selectedState = states.find((state) => state.isoCode === value);

      setCities(City.getCitiesOfState("IN", value));

      setFormData({
        state: selectedState.name,
        city: "",
        wardNo: "",
      });

      setWardAvailable(null);

      return;
    }

    if (name === "city") {
      setFormData((prev) => ({
        ...prev,
        city: value,
        wardNo: "",
      }));

      setWardAvailable(null);

      return;
    }

    if (name === "wardNo") {
      setFormData((prev) => ({
        ...prev,
        wardNo: value,
      }));

      setWardAvailable(null);

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkWard = async () => {
    if (!formData.state || !formData.city || !formData.wardNo) return;

    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/check-ward`,
        {
          params: {
            state: formData.state,
            city: formData.city,
            wardNo: formData.wardNo,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setWardAvailable(res.data.available);

      if (!res.data.available) {
        toast.error(res.data.message);
      } else {
        toast.success("Ward is available");
      }
    } catch (error) {
      toast.error("Unable to check ward");
      setWardAvailable(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wardAvailable) {
      toast.error("Please select an available ward.");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/create-officer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(res.data.message);

      alert(`
Officer Created Successfully

Officer ID : ${res.data.officerId}
Password   : ${res.data.password}
      `);

      setFormData({
        state: "",
        city: "",
        wardNo: "",
      });

      setCities([]);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <div className="flex items-center gap-3 mb-8">
          <FaUserPlus className="text-green-600 text-3xl" />
          <h1 className="text-3xl font-bold">Create Officer</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">State</label>

            <select
              name="state"
              value={
                states.find((s) => s.name === formData.state)?.isoCode || ""
              }
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3"
              required
            >
              <option value="">Select State</option>

              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium">City</label>

            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!cities.length}
              className="w-full mt-2 border rounded-lg p-3"
              required
            >
              <option value="">Select City</option>

              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium">Ward Number</label>

            <input
              type="number"
              min="1"
              name="wardNo"
              value={formData.wardNo}
              onChange={handleChange}
              onBlur={checkWard}
              placeholder="Enter Ward Number"
              className="w-full mt-2 border rounded-lg p-3"
              required
            />

            {/* Ward Availability Status */}
            {wardAvailable === true && (
              <p className="text-green-600 mt-2">✅ Ward is available</p>
            )}

            {wardAvailable === false && (
              <p className="text-red-600 mt-2">
                ❌ Officer already exists for this ward
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!wardAvailable}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              wardAvailable
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Create Officer
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOfficer;
