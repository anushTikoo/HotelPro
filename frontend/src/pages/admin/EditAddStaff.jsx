import Header from "../../components/Header";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaUserTie, FaSave, FaPlus, FaPhone, FaBriefcase, FaIdCard } from "react-icons/fa";
import { WiDaySunny, WiNightClear, WiDaySunnyOvercast } from "react-icons/wi";
const API_BASE = import.meta.env.VITE_BACKEND_API_BASEURL;

function EditAddStaff() {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("for");
  const staff_name = searchParams.get("name");
  const staff_role = searchParams.get("role");
  const staff_phone = searchParams.get("phone");
  const staff_shift = searchParams.get("shift");
  const id = searchParams.get("id");
  const [name, setName] = useState(staff_name || "");
  const [role, setRole] = useState(staff_role || "");
  const [phone, setPhone] = useState(staff_phone || "");
  const [shift, setShift] = useState(staff_shift || "");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleAdd = async () => {
    if (!name || !role || !phone || !shift) {
      toast.error("Please Fill All Fields!");
      return;
    }
    try {
      await axios.post(`${API_BASE}/staff/`, {
        name: name,
        role: role,
        phone: phone,
        shift: shift,
      });
      navigate("/admin/managestaff?action=add");
    } catch (err) {
        if (err.response?.status === 400) toast.warn(err.response.data.detail);
        else {
          console.error(err);
          if (!toast.isActive(1)) toast.error("Unexpected Error", { toastId: 1 });
        }
    }
  };

  const handleEdit = async (id) => {
    if (!name || !role || !phone || !shift) {
      toast.error("Please Fill All Fields!");
      return;
    }
    try {
      await axios.put(`${API_BASE}/staff/${id}`, {
        name: name,
        role: role,
        phone: phone,
        shift: shift,
      });
      navigate("/admin/managestaff?action=update");
    } catch (err) {
        if (err.response?.status === 400) toast.warn(err.response.data.detail);
        else {
          console.error(err);
          if (!toast.isActive(1)) toast.error("Unexpected Error", { toastId: 1 });
        }
    }
  };

  return (
    <>
      <Header />
      <ToastContainer autoClose={2500} position="top-center" />
      <main className="fixed inset-0 top-20 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center px-4 ">

        <div className="max-w-xl w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">

          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-4 text-white">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaUserTie className="w-5 h-5" />
              {action === "edit" ? "Edit Staff Member" : "Add New Staff"}
            </h2>
          </div>

          <div className="p-5 space-y-4">

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter full name"
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border-2 border-gray-300 focus:border-teal-500 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Role
              </label>
              <div className="relative">
                <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  type="text"
                  placeholder="e.g., Receptionist, Manager"
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border-2 border-gray-300 focus:border-teal-500 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3" />
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border-2 border-gray-300 focus:border-teal-500 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Work Shift
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setShift("morning")}
                  className={`py-2 px-3 text-sm rounded-lg font-semibold border-2 transition-all duration-300 flex items-center justify-center gap-1 ${
                    shift === "morning"
                      ? "bg-amber-100 text-amber-700 border-amber-300 shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:border-amber-400"
                  }`}
                >
                  <WiDaySunny className="w-5 h-5" />
                  Morning
                </button>
                <button
                  onClick={() => setShift("evening")}
                  className={`py-2 px-3 text-sm rounded-lg font-semibold border-2 transition-all duration-300 flex items-center justify-center gap-1 ${
                    shift === "evening"
                      ? "bg-orange-100 text-orange-700 border-orange-300 shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:border-orange-400"
                  }`}
                >
                  <WiDaySunnyOvercast className="w-5 h-5" />
                  Evening
                </button>
                <button
                  onClick={() => setShift("night")}
                  className={`py-2 px-3 text-sm rounded-lg font-semibold border-2 transition-all duration-300 flex items-center justify-center gap-1 ${
                    shift === "night"
                      ? "bg-indigo-100 text-indigo-700 border-indigo-300 shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:border-indigo-400"
                  }`}
                >
                  <WiNightClear className="w-5 h-5" />
                  Night
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => (action === "edit" ? handleEdit(id) : handleAdd())}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-sm py-3 rounded-lg shadow-md hover:shadow-lg hover:from-teal-700 hover:to-emerald-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
              >
                {action === "edit" ? (
                  <>
                    <FaSave className="w-3 h-3" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <FaPlus className="w-3 h-3" />
                    Add Staff
                  </>
                )}
              </button>

              <button
                onClick={() => navigate("/admin/managestaff")}
                className="w-full bg-gray-200 text-gray-700 font-semibold text-sm py-2.5 rounded-lg hover:bg-gray-300 active:scale-95 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default EditAddStaff;