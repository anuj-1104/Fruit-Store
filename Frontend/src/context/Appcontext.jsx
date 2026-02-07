// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

// 1. Create a Context     step 1 create a context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Global State
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [total_count, setTotalCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterproduct, setFilterProduct] = useState([]);
  const [admin, setAdmin] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //set the user data to refresh time a user
  useEffect(() => {
    try {
      const savedtoken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("UserData");
      const savedCart = localStorage.getItem("Cart_count");

      if (savedtoken && savedUser) {
        setUser(JSON.parse(savedUser));
      }

      if (savedCart) {
        setTotalCount(JSON.parse(savedCart)); //converted a string data
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setTotalCount(JSON.parse(savedCart));
    }
  }, []);

  //any refresh the page to set the data in parmentnt in the local storage
  useEffect(() => {
    if (total_count.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(total_count)); //convert a json type data
    }
  }, [total_count]);

  //role based login
  const loginUser = async (userData) => {
    try {
      const response = await axios.post("/user/login", {
        email: userData.email,
        password: userData.password,
      });

      if (response.request.status === 200) {
        const token = response.data.access_token;
        const jsonData = JSON.stringify(response.data.user);

        if (response.data.role === "Admin") {
          setAdmin(response.data.user);
          localStorage.setItem("admin-token", token);
          localStorage.setItem("admin-info", jsonData);
          navigate("/admin/page");
          setError(null);
          return;
        }

        // Save token
        localStorage.setItem("token", token);
        localStorage.setItem("UserData", jsonData);

        // Decode token (NO SECRET) provide a directly use in the react
        const decodedUser = jwtDecode(token);

        setUser(response);

        navigate("/home", { replace: true });
        return true;
      }
    } catch (error) {
      setError("Invalid credentials");
      return false;
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(total_count));
  }, [total_count]);

  const addToCart = (productId) => {
    const updatedCart = { ...total_count };
    updatedCart[productId] = (updatedCart[productId] || 0) + 1;
    setTotalCount(updatedCart);
    toast.success("Added to Cart");
  };

  const removeToCart = (productId) => {
    toast.success("Quantity Decreased");
    const updatecart = { ...total_count };
    if (updatecart[productId]) {
      updatecart[productId] -= 1;

      if (updatecart[productId] <= 0) {
        delete updatecart[productId];
      }
    }
    setTotalCount(updatecart);
  };

  const forgetpassword = async (formdata) => {
    try {
      const response = await axios.post("/user/forget_pass", {
        email: formdata.email,
        password: formdata.password,
        confirm_pass: formdata.confirm_pass,
      });

      if (response.request.status === 200) {
        window.location.href = "/home";
        toast.success(response.data);
        setError(null);
        return response.data;
      }
    } catch (error) {
      setError(error?.response?.data?.detail);
    }
  };

  //Logout
  const Logout = async () => {
    try {
      localStorage.clear(); //clear a localstorage
      localStorage.removeItem("UserData");
      window.location.href = "/"; //directly redict used browser
      setUser(null);
    } catch (error) {
      setError(null);
    }
  };

  //registration user
  const registration_user = async (userdata) => {
    try {
      const response = await axios.post("/user/user", {
        email: userdata.email,
        password: userdata.password,
        name: userdata.name,
        phone: userdata.phone,
      });

      if (response.request.status == 200) {
        setError(null);
      }
    } catch (error) {
      setError(error.message || "Faild Registration.");
      return error.status;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    const fetchProducts = async () => {
      setLoading(true); // start loading

      try {
        const res = await axios.get("/product/products");

        if (res.status === 200) {
          setData(res.data || []);
          setError(null);
          setFilterProduct(res.data || []);
        }
      } catch (error) {
        setError("Failed to load products");
        toast.error(error.message);
      } finally {
        setLoading(false);
        setError(null);
      }
    };

    fetchProducts();
  }, [token]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      navigate("/fruites");
    }
    filterProduct(searchQuery);
  }, [searchQuery]);

  const filterProduct = () => {
    const result = filterproduct.filter((value) =>
      value.p_name.toLowerCase().includes(searchQuery),
    );
    setData(result);
  };

  const value = {
    user,
    loginUser,
    data,
    error,
    loading,
    searchQuery,
    setSearchQuery,
    registration_user,
    token,
    admin,
    Logout,
    navigate,
    forgetpassword,
    setTotalCount,
    removeToCart,
    addToCart,
    total_count,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

//easy to use a any child
export const useAppContext = () => useContext(AuthContext);
//Access a directly to use a usecontext
