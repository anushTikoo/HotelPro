import { useNavigate, Link } from "react-router-dom";
import companyLogo from "../assets/Logo.png";
import { AuthContext } from "../auth/Authorization";
import { useContext } from "react";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (!user) {
      navigate("/");
      return;
    }

    if (user.role === "guest") navigate("/guest/home");
    else if (user.role === "admin") navigate("/admin/dashboard");
    else navigate("/");
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 shadow-2xl backdrop-blur-lg flex justify-between items-center h-18 px-6 pl-1">
        <img
          src={companyLogo}
          onClick={handleLogoClick}
          alt="CompanyLogo"
          className="w-40 h-auto cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
        />

        {user ? (
          <div className="flex gap-6 items-center">
            <div className="text-white font-bold text-2xl drop-shadow-lg animate-fade-in">
              Welcome, <span className="text-amber-300">{user.username}</span>!
            </div>

            {user.role === "admin" && (
              <div className="flex gap-6">
                <Link
                  to="/admin/managerooms"
                  className="px-6 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-white/20"
                >
                  Manage Rooms
                </Link>

                <Link
                  to="/admin/managestaff"
                  className="px-6 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-white/20"
                >
                  Manage Staff
                </Link>

                <Link
                  to="/admin/manageguests"
                  className="px-6 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-white/20"
                >
                  Manage Guests
                </Link>
              </div>
            )}
            <Link
              to="/"
              onClick={logout}
              className="px-6 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white font-semibold hover:bg-red-500/80 hover:border-red-400/50 hover:scale-105 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-red-500/30"
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link
              to="/signup"
              className="px-6 py-2.5 rounded-xl border-2 border-white/50 text-white font-semibold hover:bg-white/20 hover:border-white hover:scale-105 transition-all duration-300 active:scale-95"
            >
              Register
            </Link>

            <Link
              to="/"
              className="px-6 py-2.5 rounded-xl bg-white text-teal-700 font-bold hover:bg-gradient-to-r hover:from-amber-400 hover:to-orange-500 hover:text-white hover:scale-105 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
