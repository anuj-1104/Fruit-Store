import React, { useState } from "react";
import { useAppContext } from "../context/Appcontext";
import axios from "../api/axios";

const Feedback = () => {
  const user_data = JSON.parse(localStorage.getItem("UserData"));
  const [formdata, setFormdata] = useState({
    name: user_data.email,
    description: "",
  });

  // const { user, token } = useAppContext();

  //single render a set data one handller all data set
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/product/feedback`, {
        message: formdata.description,
      });

      if (res.request.status === 200) {
        toast.success(res.data.message);
        setFormdata({
          name: "",
          description: "",
        });
      }
    } catch (error) {
      toast.error(error);
    }
    //submit form data in api
  };

  return (
    <div className=" bg-black flex items-center justify-center p-2 ">
      {/* <ToastContainer theme="black" position="bottom-right" autoClose={2000} /> */}
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-black border border-white rounded-2xl shadow-2xl p-8 w-full"
        >
          {/* Header - Perfectly Centered */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold  bg-linear-to-r from-lime-50 to-cyan-400 bg-clip-text text-transparent">
              Feedback
            </h1>
            <p className="text-white/60 mt-2 text-sm">We value your opinion</p>
          </div>

          {/* Form Fields - Centered */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-white font-medium mb-3 text-sm"
              >
                Enter your name
              </label>
              <input
                type="email"
                id="name"
                name="name"
                value={formdata.name}
                onChange={handlechange}
                required
                className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                placeholder="Enter a E- mail"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-white font-medium mb-3 text-sm"
              >
                Your feedback
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formdata.description}
                onChange={handlechange}
                required
                className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 resize-vertical focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                placeholder="Tell us what you think..."
              />
            </div>

            {/* Submit Button - Centered */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
