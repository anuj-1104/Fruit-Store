import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../api/axios";

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartItems = JSON.parse(
          localStorage.getItem("Cart_count") || "[]",
        );

        if (cartItems.length === 0) {
          setLoading(false);
          return;
        }

        const res = await axios.post(`/product/findproduct/${cartItems[0]}`, {
          p_id: cartItems,
        });

        if (res.status === 200) {
          const data = res.data;
          if (Array.isArray(data)) {
            setItems(data);
          } else if (data && typeof data === "object") {
            setItems([data]); // Wrap single object in array
          } else {
            setItems([]); // Empty array for invalid data
          }
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        toast.error("Failed to load cart items");
        setItems([]); // Ensure array even on error
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []); // Runs ONCE only

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Your Cart
        </h1>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-xl text-gray-300">Loading cart...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-6">🛒</div>
            <p className="text-2xl">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <div
                key={item.p_id || index}
                className="bg-gray-800 p-8 rounded-3xl hover:shadow-2xl transition-all"
              >
                <img
                  src={item.image_url}
                  alt={item.p_name || "Product"}
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-2xl font-bold mb-4">{item.p_name}</h3>
                {item.description && (
                  <p className="text-gray-300 mb-6 line-clamp-3">
                    {item.description}
                  </p>
                )}

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-orange-500">
                      ₹{item.p_offerprice || item.p_price}
                    </span>
                    {item.p_offerprice && item.p_offerprice < item.p_price && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{item.p_price}
                      </span>
                    )}
                  </div>

                  <div className="bg-black/30 p-4 rounded-2xl">
                    <span className="text-lg font-semibold">
                      Qty: {item.p_qty || 1}
                    </span>
                  </div>

                  <div className="bg-linear-to-r from-orange-500 to-yellow-500 p-6 rounded-2xl text-center">
                    <span className="text-xl font-bold text-white">
                      Total: ₹
                      {(
                        (item.p_offerprice || item.p_price) * (item.p_qty || 1)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
