import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAppContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import Loader from "../component/Loading/Loading";

const Order = () => {
  const { token } = useAppContext();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [userview, setUserView] = useState(null);

  //find the orders search query used _id and user_id
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const result = order.filter(
      (
        items, //used a two state and find the first state and set data in second state
      ) =>
        items?._id?.toLowerCase().includes(value) ||
        items?.user?.user_name?.toLowerCase().includes(value),
    );

    setFilteredData(result);
  };

  useEffect(() => {
    setUserView(null);
    if (search.length === 0) {
      setFilteredData(order);
    }
  }, [filteredData]);

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

        if (res.request?.status === 200) {
          setOrder(res.data.orders);
          setFilteredData(res.data.orders);
          setLoading(false);
        }
      } catch (err) {
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
  }, [token]);

  return (
    <div className="orders-container bg-black text-white p-3  ">
      <div className="p-4 flex justify-between">
        <h2>Recent Orders (Total: {filteredData.length})</h2>
        <input
          type="text"
          name="search"
          id="search"
          autoFocus
          placeholder="search Order.."
          value={search}
          onChange={handleSearch}
          className="bg-black w-full outline-0 rounded-3xl border-white border  text-start p-2 md:w-min"
        />
      </div>

      {filteredData ? (
        filteredData.map((orderItem, index) => (
          <div
            key={orderItem.created_At || index}
            className={`order-card p-2  grid grid-cols-1 md:grid-cols-2  md:auto-cols-auto bg-blue-900  m-2 overflow-auto rounded-2xl border transform-3d border-white hover:-translate-y-1 duration-400 delay-75 hover:bg-linear-to-r from-blue-600 to-blue-900 `}
          >
            <div className="order-header  bg-black/20 rounded-2xl m-1 ">
              <p className="bg-black/30 p-2 m-1 rounded-2xl">
                Order ID: {orderItem?._id ?? " "}
              </p>
              <p className="bg-black/30 p-2 m-1 rounded-2xl">
                Total: ₹{orderItem.total_price}
              </p>
              <p className="bg-black/30 p-2 m-1 rounded-2xl">
                {/* to used localdatetime */}
                Date: {new Date(orderItem.created_At).toLocaleString()}
              </p>

              <p className="bg-black/30 p-2 m-1 rounded-2xl">
                Payment:{" "}
                {orderItem.online_payment === null
                  ? "Cash On Dilevary"
                  : orderItem.online_payment}
              </p>
            </div>
            <ul
              key={orderItem._id}
              className={`items-list bg-black/20 auto rounded-2xl p-2 m-0  grid grid-cols-1 `}
            >
              <button
                className="bg-black w-10 h-10 m-3 hover:scale-[1.05] duration-300 rounded-full"
                onClick={() =>
                  setUserView((prev) => (prev === index ? null : index))
                }
              >
                {orderItem.user?.user_name.charAt()}{" "}
                {/*  All Customer first latter show */}
              </button>
              {userview === index && (
                <li
                  onClick={() => setUserView(null)}
                  className="absolute backdrop-blur-md z-999 bg-black/10 p-3 h-auto rounded-2xl "
                >
                  <p className="text-center mb-4 font-medium">
                    Customer Detail
                  </p>
                  <p className="">
                    Customer Name: {orderItem.user?.user_name ?? ""}
                  </p>
                  <p className="">
                    Customer Phone: {orderItem.user?.phone ?? ""}
                  </p>
                  <p className="">
                    Customer Card Number: {orderItem.user?.cardnumber ?? ""}
                  </p>
                  <p className="">
                    Payment Type: {orderItem.user?.payment ?? ""}
                  </p>
                </li>
              )}

              {orderItem.p_items?.map((item, key) => (
                <div
                  key={item.p_id || key}
                  className={`grid relative  justify-items-center-safe    grid-cols-3 `}
                >
                  <p>{item.p_name}</p>
                  <p className="offer-price">Price: ₹{item.p_offerprice}</p>

                  <div className="w-28 h-28 relative ">
                    <img
                      className="bg-black/30 w-full h-full object-fit rounded-2xl  hover:scale-[1.05] delay-150 duration-300"
                      src={item?.image_url}
                      alt={item?.p_name}
                    />
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className=" bg-black min-h-43.5 m-5 text-white justify-center items-center">
          <Loader />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Order;
