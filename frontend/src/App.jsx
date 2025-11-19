import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthContext } from "./auth/Authorization";
import { useContext } from "react";
import SearchContextFunc from "./pages/user/SearchContext";
const Signup = lazy(() => import("./pages/auth/Signup"));
const Login = lazy(() => import("./pages/auth/Login"));
const Home = lazy(() => import("./pages/user/Home"));
const SearchResults = lazy(() => import("./pages/user/SearchResults"));
const BookingConfirm = lazy(() => import("./pages/user/BookingConfirm"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ManageGuests = lazy(() => import("./pages/admin/ManageGuests"));
const ManageStaff = lazy(() => import("./pages/admin/ManageStaff"));
const EditAddRoom = lazy(() => import("./pages/admin/EditAddRoom"));
const ManageRooms = lazy(() => import("./pages/admin/ManageRooms"));
const EditAddStaff = lazy(() => import("./pages/admin/EditAddStaff"));

function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" replace />;
  if (adminOnly && user.role === "guest")
    return <Navigate to="/guest/home" replace />;
  if (!adminOnly && user.role === "admin")
    return <Navigate to="/admin/dashboard" replace />;

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
      <Route path="/signup" element={<Suspense fallback={<div>Loading...</div>}><Signup /></Suspense>} />

      <Route
        path="/guest/*"
        element={
          <ProtectedRoute>
            <SearchContextFunc>
              <Suspense>
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="searchresults" element={<SearchResults />} />
                  <Route path="bookingconfirm" element={<BookingConfirm />} />
                </Routes>
              </Suspense>
            </SearchContextFunc>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute adminOnly>
            <Suspense>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="manageguests" element={<ManageGuests />} />
                <Route path="managerooms" element={<ManageRooms />} />
                <Route path="managestaff" element={<ManageStaff />} />
                <Route path="editaddroom" element={<EditAddRoom />} />
                <Route path="editaddstaff" element={<EditAddStaff />} />
              </Routes>
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
