import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { FaImages } from "react-icons/fa6";
import { FaPlus, FaHome, FaBox, FaUsers, FaChartBar } from "react-icons/fa";

const Admincontrol = () => {
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormdata] = useState({
    p_id: "",
    p_name: "",
    p_offerprice: "",
    p_price: "",
    p_qty: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  //single image uploaded
  const handleCategoryImageChange = (e) => {
    const file = e.target.files[0];
    setFormdata((prev) => ({ ...prev, image: file }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("product/add", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.request.status === 201 || response.request.status === 200) {
        console.log("Upload successful");
        setFormdata({
          p_id: "",
          p_name: "",
          p_offerprice: "",
          p_price: "",
          p_qty: "",
          description: "",
        });
        toast.success(`${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(`Admin Not Found: ${error}`);
      setError("Upload failed");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br  from-slate-50 to-slate-200">
        {/* Admin Header */}
        <header className="bg-black/95 backdrop-blur-md border-b border-black/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left: Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-kinear-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FaBox className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">
                    Admin Dashboard
                  </h1>
                  <p className="text-xs text-gray-400">
                    Fruits & Vegetables Store
                  </p>
                </div>
              </div>

              {/* Center: Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <FaHome className="w-4 h-4" />
                  <span>Dashboard</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <FaChartBar className="w-4 h-4" />
                  <span>Analytics</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <FaUsers className="w-4 h-4" />
                  <span>Customers</span>
                </a>
              </nav>

              {/* Right: Actions */}
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                  <FaChartBar className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-linear-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">AD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}

          {/* Add Product Button */}
          <div className="flex justify-end-safe mb-12">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="group bg-black text-white px-8 py-4 rounded-3xl font-semibold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 hover:bg-gray-900 transition-all duration-300 flex items-center space-x-3 active:scale-95"
            >
              <FaPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Add Items</span>
            </button>
          </div>

          {/* Add Product Modal */}
          {isOpen && (
            <div className="bg-white/80 h-150 backdrop-blur-md overflow-scroll overflow-x-hidden  shadow-2xl rounded-3xl border border-white/50 max-w-4xl mx-auto p-8 lg:p-12 animate-in slide-in-from-top-4 duration-500">
              <form onSubmit={handleUpload} className="space-y-8">
                {/* Product ID & Name */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Product ID
                    </label>
                    <input
                      value={formData.p_id}
                      name="p_id"
                      type="number"
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/70 hover:bg-white shadow-lg hover:shadow-xl"
                      placeholder="Enter Product ID"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Product Name
                    </label>
                    <input
                      value={formData.p_name}
                      name="p_name"
                      type="text"
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/70 hover:bg-white shadow-lg hover:shadow-xl"
                      placeholder="Enter Product Name"
                      required
                    />
                  </div>
                </div>

                {/* Price & Offer Price */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Price (₹)
                    </label>
                    <input
                      value={formData.p_price}
                      name="p_price"
                      type="number"
                      step="0.01"
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/70 hover:bg-white shadow-lg hover:shadow-xl"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Offer Price (₹)
                    </label>
                    <input
                      value={formData.p_offerprice}
                      name="p_offerprice"
                      type="number"
                      step="0.01"
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/70 hover:bg-white shadow-lg hover:shadow-xl"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Quantity & Description */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Quantity
                    </label>
                    <input
                      value={formData.p_qty}
                      name="p_qty"
                      type="number"
                      min={1}
                      max={100}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/70 hover:bg-white shadow-lg hover:shadow-xl"
                      placeholder="Enter Quantity"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-5 py-4 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 resize-vertical bg-white/70 hover:bg-white shadow-lg hover:shadow-xl"
                      placeholder="Enter product description..."
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Product Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-3xl p-10 text-center hover:border-emerald-400 transition-all duration-300 bg-gradient-to-b from-white/50 to-gray-50/50 hover:shadow-xl">
                    <input
                      name="image"
                      type="file"
                      onChange={handleCategoryImageChange}
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      required
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-3 group"
                    >
                      <FaImages className="w-16 h-16 text-gray-400 group-hover:text-emerald-500 transition-all duration-300" />
                      <div>
                        <p className="text-xl font-semibold text-gray-800 group-hover:text-emerald-600">
                          Choose Image
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-5 bg-red-50 border-2 border-red-200 rounded-3xl animate-pulse">
                    <p className="text-red-800 text-sm font-semibold">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-5 px-10 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 text-xl active:scale-95"
                >
                  Add Product to Store
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admincontrol;
