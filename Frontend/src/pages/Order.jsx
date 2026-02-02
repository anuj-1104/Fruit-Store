import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAppContext } from "../context/Appcontext";
import { toast } from "react-toastify";

const Order = () => {
  const { token } = useAppContext();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  //find the orders search query
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const result = order.filter(
      (
        items, //used a two state and find the first state and set data in second state
      ) => items._id.toLowerCase().includes(value),
    );

    setFilteredData(result);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("/product/all/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data.orders);
        if (res.request?.status === 200) {
          setOrder(res.data.orders);
          setFilteredData(res.data.orders);
          toast.success(res.data.message || "Orders loaded successfully");
        } else {
          throw new Error(res.data?.message || "Failed to load orders"); //handle a throw  a catch catched the error.
        }
      } catch (err) {
        console.error("Order fetch error:", err);
        const errorMsg =
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch orders";
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders(); //check the token present or not
  }, []);

  // Loading state
  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  // Error state not find a oreder and error true
  if (error || !order) {
    return (
      <div className="error-state">
        <h3>No orders found</h3>
        <button onClick={() => window.location.reload()}>
          Retry Loading Orders
        </button>
      </div>
    );
  }

  return (
    <div className="orders-container bg-black text-white p-3  ">
      <div className="p-4 flex justify-between">
        <h2>Recent Orders (Total: {filteredData.length})</h2>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search Order..?"
          value={search}
          onChange={handleSearch}
          className="bg-black w-full rounded-3xl border-white border  text-start p-2 md:w-min"
        />
      </div>
      {filteredData.length > 0 ? (
        filteredData.map((orderItem, index) => (
          <div
            key={orderItem.created_At || index}
            className="order-card p-2  grid grid-cols-1 md:grid-cols-2  md:auto-cols-auto bg-blue-900  m-2 overflow-auto rounded-2xl border transform-3d border-white hover:-translate-y-1 duration-400 hover:bg-linear-to-r from-blue-600 to-blue-900 "
          >
            <div className="order-header p-2 bg-black/20 rounded-2xl m-1 ">
              <p className="bg-black/30 p-1 m-1 rounded-2xl">
                Order ID: {orderItem?._id ?? " "}
              </p>
              <p className="bg-black/30 p-1 m-1 rounded-2xl">
                Total: ₹{orderItem.total_price}
              </p>
              <p className="bg-black/30 p-1 m-1 rounded-2xl">
                Date: {new Date(orderItem.created_At).toLocaleString()}
              </p>
            </div>
            <ul className="items-list bg-black/20 grid grid-cols-2  rounded-2xl p-2 m-0  ">
              <li className="bg-blue-900 p-3 rounded-2xl ">
                <p className="text-center mb-4">Customer Detail</p>
                <p>Customer Name: {orderItem.user?.user_name}</p>
                <p>Customer Phone: {orderItem.user?.phone}</p>
                <p>Customer Card Number: {orderItem.user?.cardnumber}</p>
                <p>Payment Type:{orderItem.user?.payment}</p>
              </li>
              {orderItem.p_items?.map((item, i) => (
                <li
                  key={item.p_id || i}
                  className="order-item  p-1 grid grid-cols-3 "
                >
                  <span>{item.p_name}</span>
                  {item.p_offerprice && item.p_offerprice < item.p_price && (
                    <span className="offer-price">
                      Price: ₹{item.p_offerprice}
                    </span>
                  )}
                  <img
                    className="w-30  bg-black/30 rounded-2xl"
                    src={item?.image_url}
                    alt={item?.p_name}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className="empty-state bg-black text-white justify-center items-center">
          <h3 className="text-white text-2xl animate-pulse text-center transform hover:-translate-z-8 p-5 ">
            No orders yet !
          </h3>
          <p className="text-white text-2xl text-center hover:-translate-y-1 animate-pulse duration-300 p-5 ">
            Loading...
          </p>
          <p className="text-white text-2xl animate-pulse text-center hover:-translate-y-1 duration-300 p-5 ">
            Orders will appear here when placed.
          </p>
        </div>
      )}
    </div>
  );
};

export default Order;
