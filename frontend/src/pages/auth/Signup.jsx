import { useEffect, useState, useContext } from "react";
import Header from "../../components/Header";
import backgroundImage from "../../assets/backgr.avif"
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { AuthContext } from "../../auth/Authorization";
import { FaUser, FaLock, FaCheckCircle } from "react-icons/fa";
const API_BASE = import.meta.env.VITE_BACKEND_API_BASEURL;

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSignup = async () => {
      if (password !== confirmPassword) {
        if (!toast.isActive(1)) toast.error("Passwords Do Not Match!", {toastId: 1});
      }
      else if (!username || !password || !confirmPassword) {
        if (!toast.isActive(2)) toast.error("Please Fill All Details!", {toastId: 2});
      }
      else{
        try{
          const res = await axios.post(`${API_BASE}/auth/signup`, {
            "username": username,
            "password": password
          });
          navigate("/guest/home");
          login(res.data);
        }catch(err){
          try{
            if (err.response.status === 400) toast.error(err.response.data.detail)
          }catch(err){
            console.error(err);
            toast.error("Unexpected Error");
          }
        }
      }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <Header />
      <main className="relative w-full h-screen">
        <ToastContainer position="top-center" autoClose={2500}/>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-emerald-900/40"></div>

        <div className="absolute top-2/5 mt-10 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-96 bg-white/95 items-center rounded-2xl shadow-2xl border border-gray-200 p-8 hover:shadow-emerald-500/20 transition-all duration-500">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm mt-2">Join HotelPro today</p>
          </div>

          <div className="relative w-full mb-4">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="Username"
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:outline-none rounded-xl shadow-sm px-12 py-3 transition-all duration-300 hover:border-emerald-400"
            />
          </div>

          <div className="relative w-full mb-4">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:outline-none rounded-xl shadow-sm px-12 py-3 transition-all duration-300 hover:border-emerald-400"
            />
          </div>

          <div className="relative w-full mb-6">
            <FaCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              onChange={(e)=>setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              type="password"
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:outline-none rounded-xl shadow-sm px-12 py-3 transition-all duration-300 hover:border-emerald-400"
            />
          </div>

          <button
            onClick={handleSignup}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold rounded-xl py-3.5 hover:from-emerald-700 hover:to-teal-800 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-lg"
          >
            Create Account
          </button>

          <div className="flex items-center w-full my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Signup;