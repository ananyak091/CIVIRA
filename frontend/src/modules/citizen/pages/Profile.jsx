import React, { useState } from "react";
import { assets } from "@/assets/asset";
import { MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";

import { toast } from "react-toastify";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import { RiDeleteBin6Line } from "react-icons/ri";

const Myprofile = () => {
  const backendurl = import.meta.env.VITE_API_BASE_URL;
  const {
    login,
    loading,
    register,
    token,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getProfile,
  } = useAppContext();
  const [image, setImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [originalUserData, setOriginalUserData] = useState(null);

  const handleDeleteImage = (e) => {
    // delete profile image function
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Remove profile image?")) return;

    setImage(null);
    setUserData((prev) => ({
      ...prev,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5lBotWQqAFbWNJ11sk-1J_cACWsEWp9k_uA&s",
    }));
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob ? userData.dob : null);
      // ✅ Image logic
      if (image) {
        formData.append("image", image); // new image
      } else if (image === null) {
        formData.append("removeImage", true); // remove image
      }

      console.log("formdata", formData);
      const { data } = await axios.post(
        backendurl + "/api/user/update-profile",
        formData,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );

      if (data.success) {
        toast.success(data.message);
        await getProfile();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  const handleStartEdit = () => {
    setOriginalUserData(userData ? { ...userData } : null);
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    if (originalUserData) {
      setUserData(originalUserData);
    }
    setImage(false);
    setIsEdit(false);
  };

  return (
    userData && (
      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-8 md:mt-12 mb-16 md:mb-24">
        <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
                My Profile
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage your personal information and contact details.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover ring-2 ring-blue-100 shadow-sm"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                />
              </div>
              <div>
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="text-lg md:text-xl font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-full"
                  />
                ) : (
                  <p className="text-lg md:text-xl font-semibold text-slate-900">
                    {userData.name}
                  </p>
                )}

                {isEdit && (
                  <div className="flex items-center gap-3 mt-3">
                    <label
                      htmlFor="image"
                      className="cursor-pointer text-sm text-blue-600 hover:text-blue-700"
                    >
                      Change photo
                    </label>
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      hidden
                      id="image"
                    />
                    <button
                      onClick={handleDeleteImage}
                      className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                    >
                      <RiDeleteBin6Line size={16} />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="border border-slate-200 rounded-xl p-5 bg-white">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Contact Information
              </p>
              <div className="h-px bg-slate-100 my-4" />

              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Email
                  </p>
                  <p className="text-sm text-slate-900">{userData.email}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Phone
                  </p>
                  {isEdit ? (
                    <input
                      type="tel"
                      name="phone"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-200"
                    />
                  ) : (
                    <p className="text-sm text-slate-900">{userData.phone}</p>
                  )}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Address
                  </p>
                  {isEdit ? (
                    <input
                      type="text"
                      value={userData.address}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-200"
                    />
                  ) : (
                    <p className="text-sm text-slate-900">{userData.address}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-white">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Basic Information
              </p>
              <div className="h-px bg-slate-100 my-4" />

              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Gender
                  </p>
                  {isEdit ? (
                    <select
                      value={userData.gender}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                      className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  ) : (
                    <p className="text-sm text-slate-900">{userData.gender}</p>
                  )}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Birthday
                  </p>
                  {isEdit ? (
                    <input
                      type="date"
                      value={userData.dob || ""}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          dob: e.target.value,
                        }))
                      }
                      max={new Date().toISOString().split("T")[0]}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-200"
                    />
                  ) : (
                    <p className="text-sm text-slate-900">
                      {userData.dob
                        ? new Date(userData.dob).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "Not set"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3 mt-8">
            {isEdit ? (
              <>
                <button
                  onClick={handleCancelEdit}
                  className="border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all duration-200 px-6 py-2 rounded-full flex justify-center items-center gap-2"
                >
                  Cancel
                </button>
                <button
                  onClick={updateUserProfileData}
                  className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 px-6 py-2 rounded-full flex justify-center items-center gap-2"
                >
                  <FaSave />
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={handleStartEdit}
                className="border border-primaryColor text-slate-900 hover:bg-primaryColor transition-all duration-200 px-6 py-2 rounded-full flex justify-center items-center gap-2"
              >
                <MdModeEdit />
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Myprofile;
