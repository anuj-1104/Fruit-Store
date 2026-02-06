import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import ProtectedRoute from "./protected/Protected";
import Products from "./pages/Products";
import NotFound from "./component/NotFound";
import BuyProduct from "./pages/BuyProduct";
import { ToastContainer } from "react-toastify";
import Admincontrol from "./pages/Admin_Pages/Admincontrol";
import Feedback from "./pages/Feedback";
import { useAppContext } from "./context/Appcontext";
import Order from "./pages/Order";
import Cart_page from "./pages/Cart_page";
import Admin_Protected from "./protected/Admin_Protected";

const App = () => {
  const { token } = useAppContext();

  return (
    <div className="">
      <ToastContainer position="top-right" theme="dark" autoClose={2000} />
      {token && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/home" replace /> : <Login />}
        />

        {/* User ProtectedRout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/fruites" element={<Products />} />
          <Route path="/fruites/:id" element={<BuyProduct />} />
          <Route path="/feedback" element={<Feedback />}></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route path="/fruites/cart-items" element={<Cart_page />}></Route>
        </Route>

        {/* Admin ProtectedRout */}
        <Route element={<Admin_Protected />}>
          <Route path="/admin/page" element={<Admincontrol />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      {token && <Footer />}
    </div>
  );
};

export default App;
