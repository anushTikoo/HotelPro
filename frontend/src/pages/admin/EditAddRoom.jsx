import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaDoorOpen, FaRupeeSign, FaSave, FaPlus } from "react-icons/fa";
import { MdConstruction } from "react-icons/md";
const API_BASE = import.meta.env.VITE_BACKEND_API_BASEURL;

function EditAddRoom() {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("for");
  const id = searchParams.get("id");
  const no = searchParams.get("room_no");
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const price = searchParams.get("price");
  const [room_no, setRoom_No] = useState(no || "");
  const [room_type, setType] = useState(type || "");
  const [room_status, setStatus] = useState(status || "available");
  const [room_price, setPrice] = useState(price || "");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleEdit = async () => {
    if (!room_no || !room_type || !room_price) {
      toast.error("Please Fill All Fields!");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/rooms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_no: room_no,
          type: room_type,
          status: room_status,
          price: room_price,
        }),
      });

      if (!res.ok) {
        let msg = "Failed To Edit Room";

        try {
          const { detail } = await res.json();
          if (res.status === 400 && detail) msg = detail;
        } catch {
          // server didn't return JSON
        }

        toast.error(msg);
        return;
      }

      navigate("/admin/managerooms?action=update");
    } catch (err) {
      console.error(err);
      if (!toast.isActive(1)) toast.error("Unexpected Error", { toastId: 1 });
    }
  };

  const handleAdd = async () => {
    if (!room_no || !room_type || !room_price) {
      toast.error("Please Fill All Fields");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/rooms/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_no: room_no,
          type: room_type,
          price: room_price,
        }),
      });

      if (!res.ok) {
        let msg = "Failed To Add Room";

        try {
          const { detail } = await res.json();
          if (res.status === 400 && detail) msg = detail;
        } catch {
          // server didn't return JSON
        }

        toast.error(msg);
        return;
      }

      navigate("/admin/managerooms?action=add");
    } catch (err) {
      console.error(err);
      if (!toast.isActive(1)) toast.error("Unexpected Error", { toastId: 1 });
    }
  };

  return (
    <>
      <Header fetchPriority="high" />
      <ToastContainer autoClose={2500} position="top-center" />
      <main className="fixed inset-0 top-20 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white/95 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-4 text-white">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaDoorOpen className="w-5 h-5" />
              {action === "edit" ? "Edit Room" : "Add New Room"}
            </h2>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Room Number
              </label>
              <input
                onChange={(e) => setRoom_No(e.target.value)}
                value={room_no}
                type="number"
                placeholder="Enter room number"
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full px-3 py-2 text-sm rounded-lg border-2 border-gray-300 focus:border-teal-500 focus:outline-none transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Room Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setType("single")}
                  className={`py-2 px-3 text-sm rounded-lg font-semibold border-2 transition-all duration-300 ${
                    room_type === "single"
                      ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-teal-600 shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:border-teal-400"
                  }`}
                >
                  Single
                </button>
                <button
                  onClick={() => setType("double")}
                  className={`py-2 px-3 text-sm rounded-lg font-semibold border-2 transition-all duration-300 ${
                    room_type === "double"
                      ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-teal-600 shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:border-teal-400"
                  }`}
                >
                  Double
                </button>
                <button
                  onClick={() => setType("suite")}
                  className={`py-2 px-3 text-sm rounded-lg font-semibold border-2 transition-all duration-300 ${
                    room_type === "suite"
                      ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-teal-600 shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:border-teal-400"
                  }`}
                >
                  Suite
                </button>
              </div>
            </div>

            {action === "edit" && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Room Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setStatus("available")}
                    className={`py-2 px-3 text-sm rounded-lg font-semibold border-2 transition-all duration-300 flex items-center justify-center gap-1 ${
                      room_status === "available"
                        ? "bg-emerald-500 text-white border-emerald-600 shadow-md scale-105"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:border-emerald-400"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                    Available
                  </button>
                  <button
                    onClick={() => setStatus("maintenance")}
                    className={`py-2 px-3 text-sm rounded-lg font-semibold border-2 transition-all duration-300 flex items-center justify-center gap-1 ${
                      room_status === "maintenance"
                        ? "bg-amber-500 text-white border-amber-600 shadow-md scale-105"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:border-amber-400"
                    }`}
                  >
                    <MdConstruction className="w-3 h-3" />
                    Maintenance
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Price per Night
              </label>
              <div className="relative">
                <FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3" />
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  value={room_price}
                  placeholder="Enter price"
                  className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full pl-8 pr-3 py-2 text-sm rounded-lg border-2 border-gray-300 focus:border-teal-500 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={action === "edit" ? handleEdit : handleAdd}
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
                    Add Room
                  </>
                )}
              </button>

              <button
                onClick={() => navigate("/admin/managerooms")}
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

export default EditAddRoom;
