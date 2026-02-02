import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontext";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Login = () => {
  // State to toggle between Login and Register forms
  const [isLogin, setIsLogin] = useState(true);

  // State for form data
  const [formData, setFormData] = useState({
    name: "", // Only used for registration
    email: "",
    password: "",
    phone: "",
  });

  // State for handling feedback
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [mode, setMode] = useState("login");
  const { loginUser, registration_user, forgetpassword } = useAppContext();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  //dynamically check the email validation regex
  useEffect(() => {
    if (formData.email === "") return;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{3,}$/;

    regex.test(formData.email) ? setIsLoading(false) : setIsLoading(true);
  }, [formData.email]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch (mode) {
        case "login":
          await loginUser({
            email: formData.email.toLocaleLowerCase(),
            password: formData.password,
          });

          break;
        case "register":
          await registration_user({
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            name: formData.name,
          });

          setMode("login");
          break;
        case "froget_password":
          const res = await forgetpassword({
            email: formData.email,
            password: formData.password,
            confirm_pass: formData.confirm_pass,
          });
          break;
        default:
          break;
      }
    } catch (error) {
      setError(error.mmessage || "error..");
    } finally {
      setFormData({
        email: "",
        password: "",
        phone: "",
        age: "",
        confirm_pass: "",
      });

      // console.log("Try again");
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setError("");
    setIsGoogleLoading(true);
    try {
      // await loginWithGoogle();     create a login with google functionality
      toast.error("404: Unauthorized User");
    } catch (err) {
      setError(err.message || "Failed to login with Google.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // console.log(mode);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8  bg-cyan-200">
      <div className="max-w-md w-full space-y-8 bg-black border-white border p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {mode === "login" && "Sign in to your account"}
            {mode === "froget_password" && "Reset Your Password"}
            {mode === "register" && "Create a new account"}
          </h2>
          <p className="mt-2 text-center text-sm text-white">
            {mode === "login" ? "Or" : "Already have an account?"}{" "}
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? "Sign up now" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Google Login Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            {isGoogleLoading ? "Processing..." : `Continue with Google`}
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm ">
            <span className="px-2 bg-white text-black bordder rounded-md">
              Or continue with
            </span>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Name field - only shown for registration */}
          {mode === "register" && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 appearance-none text-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-white"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  required={!isLogin}
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 appearance-none text-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Email Address
            </label>
            <input
              id="username"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 appearance-none text-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              className="mt-1 appearance-none text-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
          {mode === "froget_password" && (
            <div>
              <label
                htmlFor="confirm_pass"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                id="confirm_pass"
                name="confirm_pass"
                type="password"
                required
                minLength={6}
                value={formData.confirm_pass}
                onChange={handleChange}
                className="mt-1 appearance-none text-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your confirm_pass"
              />

              <a
                onClick={() => setMode("login")}
                className="text- cursor-pointer object-center mt-5 flex justify-center text-indigo-600 hover:text-indigo-500"
              >
                Back to login.{" "}
              </a>
            </div>
          )}

          {/* Display error message if any */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : isLogin ? "Sign in" : "Sign up"}
            </button>

            {isLogin && (
              <a
                className="text- cursor-pointer object-center mt-5 flex justify-center text-indigo-600 hover:text-indigo-500"
                id="forget_password"
                onClick={() => setMode("froget_password")}
              >
                {" "}
                forget password ?
              </a>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
