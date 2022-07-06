import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import Login from "./components/common/login";
import VendorProfile from "./components/vendors/Profile";
import FoodMenu from "./components/vendors/FoodMenu";
import Dashboard from "./components/users/Dashboard";
import UseOrder from "./components/users/Order";
import VendorOrder from "./components/vendors/Orders";
import Statistics from "./components/vendors/Statistics";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="users/profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="vendors/Profile" element={<VendorProfile />} />
          <Route path="vendors/FoodMenu" element={<FoodMenu />} />
          <Route path="users/Dashboard" element={<Dashboard />} />
          <Route path="users/Order" element={<UseOrder />} />
          <Route path="vendors/Order" element={<VendorOrder />} />
          <Route path="vendors/Statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
