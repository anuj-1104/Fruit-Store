import React from "react";
import { useAppContext } from "../context/Appcontext";
import image from "../assets/4781.jpg";

export default function Example() {
  const { navigate } = useAppContext();

  return (
    <div className="flex flex-col bg-black items-center justify-center text-sm h-100vh border border-white rounded-lg p-6">
      <img
        src={image}
        alt="images Not Found"
        srcset=""
        className="w-100 rounded-4xl "
      />
      <p className="text-base mt-4 text-white hover:text-gray-500 transition text-center duration-500 animate-pulse">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="flex items-center gap-4 mt-6 ">
        <button
          type="button"
          className="bg-indigo-500 hover:bg-indigo-600 px-7 py-2.5 text-white rounded active:scale-95 transition-all"
          onClick={() => navigate("home")}
        >
          Go back home
        </button>
        <button
          type="button"
          className="group flex items-center gap-2 px-7 py-2.5 active:scale-95 transition"
        >
          Contact support
        </button>
      </div>
    </div>
  );
}
