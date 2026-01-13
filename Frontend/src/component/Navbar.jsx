import React, { useState } from "react";
import { useAppContext } from "../context/Appcontext";
import { Link } from "react-router-dom";
import { CiApple } from "react-icons/ci";
import { BsBagHeart } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const { user, navigate, total_count } = useAppContext();
  const [open, setOpen] = useState(false);
  const { Logout } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-black bg-opacity-95 backdrop-blur-md border-b border-gray-700 shadow-lg transition-all">
        <div className="flex items-center gap-2">
          <CiApple className="text-white text-4xl transition-transform hover:scale-110" />
          <h1 className="text-white text-3xl font-bold tracking-wide">
            Fruits-Store
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center text-white gap-8 font-medium select-none">
          <Link
            className="hover:text-cyan-400 duration-200 hover:-translate-y-1 transition-all"
            to={"/home"}
          >
            Home
          </Link>
          <Link
            className="hover:text-cyan-400 duration-200 hover:-translate-y-1 transition-all"
            to={"/Fruites"}
          >
            Fruits
          </Link>
          {user && (
            <Link
              className="hover:text-cyan-400 duration-200 hover:-translate-y-1 transition-all"
              to={"/order"}
            >
              Orders
            </Link>
          )}
          <Link
            className="hover:text-cyan-400 duration-200 hover:-translate-y-1 transition-all"
            to={"/feedback"}
          >
            Feedback
          </Link>

          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-500 px-3 py-1.5 rounded-full bg-gray-800 bg-opacity-50 focus-within:border-cyan-400 transition-all">
            <FiSearch className="text-gray-400" />
            <input
              className="py-1 w-full bg-transparent outline-none placeholder-gray-500 text-white"
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative cursor-pointer group">
            <BsBagHeart
              className="text-3xl transition-transform group-hover:scale-110"
              onClick={() => navigate("/fruites/cart-items")}
            />
            {total_count?.length > 0 && (
              <span className="absolute -top-2 -right-3 text-xs text-white bg-linear-to-r from-cyan-500 to-blue-500 w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                {total_count.length}
              </span>
            )}
          </div>

          {user ? (
            <button
              className="cursor-pointer px-6 py-2 bg-linear-to-r from-indigo-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all text-white rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={() => Logout()}
            >
              Logout
            </button>
          ) : (
            <button
              className="cursor-pointer px-6 py-2 bg-linear-to-r from-indigo-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all text-white rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={() => navigate("/")}
            >
              Login
            </button>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="sm:hidden text-white p-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          <TiThMenu className="text-2xl" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-in-out sm:hidden bg-black bg-opacity-95 backdrop-blur-md shadow-xl`}
      >
        <div className="flex flex-col gap-2 px-6 py-4">
          <Link
            to={"/home"}
            className="text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to={"/Fruites"}
            className="text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            onClick={() => setOpen(false)}
          >
            Fruits
          </Link>
          {user && (
            <Link
              to={"/order"}
              className="text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
              onClick={() => setOpen(false)}
            >
              Orders
            </Link>
          )}
          <Link
            to={"/feedback"}
            className="text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            onClick={() => setOpen(false)}
          >
            Feedback
          </Link>

          <div className="flex items-center text-sm gap-2 border border-gray-500 px-3 py-2 rounded-full bg-gray-800 bg-opacity-50 mt-2">
            <FiSearch className="text-gray-400" />
            <input
              className="w-full bg-transparent outline-none placeholder-gray-500 text-white"
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="relative cursor-pointer group">
              <BsBagHeart
                className="text-3xl text-white transition-transform group-hover:scale-110"
                onClick={() => {
                  navigate("/fruites/cart-items");
                  setOpen(false);
                }}
              />
              {total_count?.length > 0 && (
                <span className="absolute -top-2 -right-3 text-xs text-white bg-linear-to-r from-cyan-500 to-blue-500 w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  {total_count.length}
                </span>
              )}
            </div>

            {user ? (
              <button
                className="cursor-pointer px-6 py-2 bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all text-white rounded-full shadow-md"
                onClick={() => {
                  Logout();
                  setOpen(false);
                }}
              >
                Logout
              </button>
            ) : (
              <button
                className="cursor-pointer px-6 py-2 bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all text-white rounded-full shadow-md"
                onClick={() => {
                  navigate("/");
                  setOpen(false);
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
