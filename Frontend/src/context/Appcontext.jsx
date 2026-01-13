// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { redirect, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

// 1. Context Create karo     step 1 create a context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Global State
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [total_count, setTotalCount] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.log("Error:");
    }
  }, []);

  useEffect(() => {
    if (total_count.length > 0) {
      localStorage.setItem("Cart_count", JSON.stringify(total_count)); //convert a json type data
    }
  }, [total_count]);

  const loginUser = async (userData) => {
    console.log(userData);
    try {
      const response = await axios.post("/user/login", {
        email: userData.email,
        password: userData.password,
      });

      console.log(response.data.user);
      if (response.request.status === 200) {
        const token = response.data.access_token;
        const jsonData = JSON.stringify(response.data.user);

        console.log(jsonData);

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
      console.error(error.response?.data?.message || "Login failed");
      setError(error.response?.data?.message || "Invalid credentials");
      return false;
    }
  };

  const addToCart = (productId) => {
    setTotalCount(
      (prev) => (prev.includes(productId) ? prev : [...prev, productId]) //not a id in cart to add new id
    );
    toast.success("Added to cart!");
  };

  const forgetpassword = async (formdata) => {
    try {
      const response = await axios.post("/user/forget_pass", {
        email: formdata.email,
        password: formdata.password,
        confirm_pass: formdata.confirm_pass,
      });
      // console.log(response);

      if (response.request.status === 200) {
        console.log("Password frogated...");
        window.location.href = "/home";
        toast.success(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  //Logout
  const Logout = async () => {
    try {
      localStorage.clear(); //clear a localstorage
      console.log("Logout Successfully ");
      window.location.href = "/"; //directly redict used browser
      setUser(null);
    } catch (error) {
      console.error(error || "Data Not Erased");
    }
  };

  //registration user
  const registration_user = async (userdata) => {
    try {
      // console.log(userdata);
      const response = axios.post("/user/user", {
        email: userdata.email,
        password: userdata.password,
        name: userdata.name,
        phone: userdata.phone,
      });

      if (response.request.status == 200) {
        console.log("user Registration Successfully..");
        // console.log(response);
      }
    } catch (error) {
      setError("user not Registration..");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    console.log("find Product");
    const fetchProducts = async () => {
      setLoading(true); // start loading

      try {
        const res = await axios.get("/product/products");

        // console.log(res);
        if (res.status === 200) {
          setData(res.data || []); //not a error
          setError(null);
        }
      } catch (error) {
        // console.error(error);
        setError("Failed to load products");
        toast.error(error.message);
      } finally {
        setLoading(false); // stop loading (ONLY ONCE)
      }
    };

    fetchProducts();
  }, [token]);

  const value = {
    user,
    loginUser,
    data,
    error,
    loading,
    registration_user,
    token,
    Logout,
    navigate,
    forgetpassword,
    setTotalCount,
    addToCart,
    total_count,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  // 3. Values provide karo
};

//easy to use a any child
export const useAppContext = () => useContext(AuthContext);
//Access a directly to use a usecontext
