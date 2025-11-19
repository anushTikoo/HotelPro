import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthContext } from "./auth/Authorization";
import { useContext } from "react";
import SearchContextFunc from "./pages/user/SearchContext";

const Signup = lazy(() => import("./pages/auth/Signup.jsx"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const Home = lazy(() => import("./pages/user/Home.jsx"));
const SearchResults = lazy(() => import("./pages/user/SearchResults.jsx"));
const BookingConfirm = lazy(() => import("./pages/user/BookingConfirm.jsx"));

const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const ManageGuests = lazy(() => import("./pages/admin/ManageGuests.jsx"));
const ManageStaff = lazy(() => import("./pages/admin/ManageStaff.jsx"));
const EditAddRoom = lazy(() => import("./pages/admin/EditAddRoom.jsx"));
const ManageRooms = lazy(() => import("./pages/admin/ManageRooms.jsx"));
const EditAddStaff = lazy(() => import("./pages/admin/EditAddStaff.jsx"));

function ProtectedRoute({ adminOnly = false }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" replace />;
  if (adminOnly && user.role === "guest")
    return <Navigate to="/guest/home" replace />;
  if (!adminOnly && user.role === "admin")
    return <Navigate to="/admin/dashboard" replace />;

  return <Outlet />;
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path="/signup"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Signup />
          </Suspense>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<SearchContextFunc />}>
          <Route
            path="/guest/home"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />

          <Route
            path="/guest/searchresults"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SearchResults />
              </Suspense>
            }
          />

          <Route
            path="/guest/bookingconfirm"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <BookingConfirm />
              </Suspense>
            }
          />
        </Route>
      </Route>

      <Route element={<ProtectedRoute adminOnly />}>
        <Route
          path="/admin/dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          }
        />

        <Route
          path="/admin/manageguests"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ManageGuests />
            </Suspense>
          }
        />

        <Route
          path="/admin/managerooms"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ManageRooms />
            </Suspense>
          }
        />

        <Route
          path="/admin/managestaff"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ManageStaff />
            </Suspense>
          }
        />

        <Route
          path="/admin/editaddroom"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EditAddRoom />
            </Suspense>
          }
        />

        <Route
          path="/admin/editaddstaff"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EditAddStaff />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;