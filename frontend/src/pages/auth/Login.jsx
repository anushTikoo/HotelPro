import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../auth/Authorization";
import { FaUser, FaLock } from "react-icons/fa";
const API_BASE = import.meta.env.VITE_BACKEND_API_BASEURL;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/guest/home");
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      if (!toast.isActive(1))
        toast.error("Please Fill All Details!", { toastId: 1 });
    } else {
      setLoading(true);
      try {
        const res = await axios.post(`${API_BASE}/auth/login`, {
          username: username,
          password: password,
        });
        if (res.data.role === "guest") navigate("/guest/home");
        else navigate("/admin/dashboard");
        login(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error(err.response.data.detail);
        } else {
          console.error(err);
          toast.error("Unexpected Error");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="relative w-full h-screen">
        <ToastContainer position="top-center" autoClose={2500} />
        <img
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="/images/background.avif"
          fetchPriority="high"
          alt = "backround image"
        ></img>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-teal-900/40"></div>

        <div className="absolute top-2/5 mt-10 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-96 bg-white/95 backdrop-blur-md items-center rounded-2xl shadow-2xl border border-gray-200 p-8 hover:shadow-teal-500/20 transition-all duration-500">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Sign in to continue to HotelPro
            </p>
          </div>

          <div className="relative w-full mb-5">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full border-2 border-gray-300 focus:border-teal-500 focus:outline-none rounded-xl shadow-sm px-12 py-3 transition-all duration-300 hover:border-teal-400"
            />
          </div>

          <div className="relative w-full mb-6">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="w-full border-2 border-gray-300 focus:border-teal-500 focus:outline-none rounded-xl shadow-sm px-12 py-3 transition-all duration-300 hover:border-teal-400"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold rounded-xl py-3.5 transition-all duration-300
    ${
      loading
        ? "opacity-70 cursor-not-allowed"
        : "hover:from-teal-700 hover:to-teal-800 hover:shadow-xl hover:shadow-teal-500/30"
    }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="60"
                    strokeDashoffset="15"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="flex items-center w-full my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-teal-600 font-semibold hover:text-teal-700 hover:underline transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
