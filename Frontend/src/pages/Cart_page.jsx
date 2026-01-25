import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../api/axios";
import { useAppContext } from "../context/Appcontext";

const CartPage = () => {
  const [cartproduct, setCartProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const id = Object.keys(cartItems); //convert a object type to find a length

  const { removeToCart, navigate } = useAppContext();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        // console.log(id.length);

        if (id.length === 0) {
          setLoading(false);
          return;
        }

        const res = await axios.post(`/product/findproduct`, {
          p_id: id,
        });
        console.log(res.data);

        if (res.status === 200) {
          const data = res.data;
          setCartProduct(data);
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        toast.error("Failed to load cart items");
        setCartProduct(); // Ensure array even on error
      }
    };
    fetchCartData();
  }, [id]);

  //removed from cartitems
  const carthandller = (p_id) => {
    if (!id) {
      toast.error("Id not found");
      return;
    }
    removeToCart(p_id);
  };

  console.log(loading);

  const [showAddress, setShowAddress] = React.useState(false);

  return (
    <div className="flex flex-col md:flex-row py-16  max-w-8xl   place-content-center w-full gap-10 px-6 mx-auto bg-black">
      <div className="flex-1 max-w-4xl border border-white rounded-2xl p-3    ">
        <h1 className="text-3xl font-medium mb-6 text-white">
          Shopping Cart{" "}
          <span className="text-sm text-white">{id.length} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3 ">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {!loading
          ? "Loading"
          : cartproduct.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
              >
                <div className="flex items-center md:gap-6 gap-3">
                  <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                    <img
                      className="max-w-full h-full object-cover"
                      src={product.image_url}
                      alt={product.p_name}
                    />
                  </div>
                  <div>
                    <p className="hidden md:block font-semibold text-white">
                      {product.p_name}
                    </p>
                    <div className="font-normal text-gray-500/70">
                      <p>
                        Size: <span>{product.size || "N/A"}</span>
                      </p>
                      <div className="flex items-center">
                        <p>Qty:</p>
                        <select className="outline-none">
                          {Array(5)
                            .fill("")
                            .map((_, index) => (
                              <option key={index} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center">₹{product.p_offerprice}</p>
                <button
                  value={product._id}
                  className="cursor-pointer mx-auto"
                  onClick={() => carthandller(product.p_id)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                      stroke="#FF532E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}

        <button
          className="group cursor-pointer flex text-white items-center mt-8 gap-2  font-medium"
          onClick={() => navigate("/fruites")}
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="#615fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </button>
      </div>

      <div className="max-w-90 rounded-2xl  w-full bg-blue-900 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium text-white">
          Order Summary
        </h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase text-white">
            Delivery Address
          </p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">No address found</p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-white hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                <p
                  onClick={() => setShowAddress(false)}
                  className="text-gray-500 p-2 hover:bg-gray-100"
                >
                  New York, USA
                </p>
                <p
                  onClick={() => setShowAddress(false)}
                  className="text-white text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6 text-white">
            Payment Method
          </p>

          <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-white mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>$20</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>$20</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>$20</span>
          </p>
        </div>

        <button className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
