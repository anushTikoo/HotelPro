import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/user/Home'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';
import SearchResults from './pages/user/SearchResults';
import BookingConfirm from './pages/user/BookingConfirm';
import { AuthContext } from './auth/Authorization';
import { useContext } from 'react';
import SearchContextFunc from './pages/user/SearchContext';
import ManageGuests from './pages/admin/ManageGuests';
import ManageStaff from './pages/admin/ManageStaff';
import EditAddRoom from './pages/admin/EditAddRoom';
import ManageRooms from './pages/admin/ManageRooms';
import EditAddStaff from './pages/admin/EditAddStaff';

function ProtectedRoute({ children, adminOnly=false }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" replace />;
  if (adminOnly && user.role === "guest") return <Navigate to="/guest/home" replace />;
  if (!adminOnly && user.role === "admin") return <Navigate to="/admin/dashboard" replace />;

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/guest/*"
        element={
          <ProtectedRoute>
            <SearchContextFunc>
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="searchresults" element={<SearchResults />} />
                <Route path="bookingconfirm" element={<BookingConfirm />} />
              </Routes>
            </SearchContextFunc>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute adminOnly>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="manageguests" element={<ManageGuests />} />
              <Route path="managerooms" element={<ManageRooms />} />
              <Route path="managestaff" element={<ManageStaff />} />
              <Route path="editaddroom" element={<EditAddRoom />} />
              <Route path="editaddstaff" element={<EditAddStaff />} />
            </Routes>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;