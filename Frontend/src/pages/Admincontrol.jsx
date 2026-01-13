import React, { useState } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { FaImages } from "react-icons/fa6";

const Admincontrol = () => {
  const [formdata, setFormdata] = useState({
    p_id: "",
    p_name: "",
    p_offerprice: "",
    p_price: "",
    p_qty: "",
    image: "",
    description: "",
  });

  const [error, setError] = useState(null);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleCategoryImageChange = (e) => {
    const file = e.target.files[0];
    setFormdata((prev) => ({ ...prev, image: file }));
  };

  const handleupload = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("product/add", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

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
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Add New Fruits and Vegitables
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Fill in the details to add a new product to your store
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/50 p-8 sm:p-12">
          <form onSubmit={handleupload} className="space-y-6">
            {/* Product ID & Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product ID
                </label>
                <input
                  value={formdata.p_id}
                  name="p_id"
                  type="number"
                  onChange={handlechange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white shadow-sm"
                  placeholder="Enter Product ID"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  value={formdata.p_name}
                  name="p_name"
                  type="text"
                  onChange={handlechange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white shadow-sm"
                  placeholder="Enter Product Name"
                  required
                />
              </div>
            </div>

            {/* Price & Quantity Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  value={formdata.p_price}
                  name="p_price"
                  type="number"
                  step="0.01"
                  onChange={handlechange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white shadow-sm"
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Offer Price (₹)
                </label>
                <input
                  value={formdata.p_offerprice}
                  name="p_offerprice"
                  type="number"
                  step="0.01"
                  onChange={handlechange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white shadow-sm"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </label>
              <input
                value={formdata.p_qty}
                name="p_qty"
                type="number"
                onChange={handlechange}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white shadow-sm"
                placeholder="Enter Quantity"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                onChange={handlechange}
                value={formdata.description}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical bg-white/50 hover:bg-white shadow-sm"
                placeholder="Enter product description..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-all duration-200 bg-linear-to-b from-white/50 to-gray-50/50">
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
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <FaImages className="w-12 h-12 text-gray-400" />

                  <div>
                    <p className="text-lg font-medium text-gray-700">
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
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 text-lg"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admincontrol;
