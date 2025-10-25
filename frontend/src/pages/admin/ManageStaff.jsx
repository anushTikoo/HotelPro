import { useEffect, useState } from "react";
import Header from "../../components/Header";
import StaffCard from "../../components/StaffCard";
import axios from "axios";
import { Circles } from "react-loading-icons";
import { ToastContainer, toast } from "react-toastify";
import { Link, useSearchParams } from "react-router-dom";
import { FaUserTie, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
const API_BASE = import.meta.env.VITE_BACKEND_API_BASEURL;

function ManageStaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  const getStaff = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/staff/`);
      setStaff(res.data);
    } catch (err) {
      console.error(err);
      if (!toast.isActive(1)) toast.error("Couldn't Get Staff", { toastId: 1 });
    } finally {
      setLoading(false);
    }
  };

  const handleFire = async (id, name) => {
    const result = await Swal.fire({
      title: `Fire ${name}?`,
      text: "This will permanently remove the employee from the system.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, fire them",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      color: "#374151",
      iconColor: "#f59e0b",
      customClass: {
        popup: "rounded-2xl shadow-2xl border-2 border-gray-200",
        title: "text-2xl font-bold text-gray-800",
        htmlContainer: "text-gray-600",
        confirmButton:
          "rounded-xl px-6 py-3 font-semibold shadow-lg hover:scale-105 transition-all duration-300",
        cancelButton:
          "rounded-xl px-6 py-3 font-semibold shadow-lg hover:scale-105 transition-all duration-300",
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_BASE}/staff/${id}`);
        setStaff((prev) => prev.filter((item) => item.id !== id));
        toast.success(`Successfully Fired ${name}`);
      } catch (err) {
        console.error(err);
        toast.error("Couldn't Fire Employee");
      }
    }
  };

  useEffect(() => {
    getStaff();
    if (action === "update") toast.success("Staff Updated Successfully");
    else if (action === "add") toast.success("Staff Added Successfully");
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <ToastContainer autoClose={2500} position="top-center" />

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
                <FaUserTie className="text-teal-600" />
                Manage Staff
              </h1>
              <p className="text-gray-600 mt-2">View and manage hotel employees</p>
            </div>
            <Link
              to="/admin/editaddstaff?for=add"
              className="group flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-emerald-700 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
              Add Staff
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 px-8 py-4">
              <StaffCard
                name="Name"
                role="Role"
                phone="Phone"
                shift="Shift"
                action="Actions"
                className="text-gray-700 font-bold text-sm uppercase"
              />
            </div>

            <div className="p-6 space-y-3 max-h-[600px] overflow-y-auto">
              {staff.length === 0 ? (
                <div className="py-16">
                  {loading ? (
                    <Circles stroke="#0d9488" className="w-16 h-16 block mx-auto" />
                  ) : (
                    <div className="text-center">
                      <FaUserTie className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-600 text-lg font-medium">
                        No staff found
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Add employees to get started
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                staff.map((employee) => (
                  <div
                    key={employee.id}
                    className="group bg-gray-50 hover:bg-teal-50 rounded-xl transition-all duration-300 p-4 border-2 border-gray-200 hover:border-teal-300 hover:shadow-md"
                  >
                    <StaffCard
                      name={employee.name}
                      role={employee.role}
                      phone={employee.phone}
                      shift={employee.shift}
                      action={
                        <div className="flex gap-3 justify-center">
                          <Link
                            to = {`/admin/editaddstaff?for=edit&id=${employee.id}&name=${employee.name}&role=${employee.role}&phone=${employee.phone}&shift=${employee.shift}`}
                            className="px-5 cursor-pointer py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleFire(employee.id, employee.name)}
                            className="cursor-pointer px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
                          >
                            Fire
                          </button>
                        </div>
                      }
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ManageStaff;