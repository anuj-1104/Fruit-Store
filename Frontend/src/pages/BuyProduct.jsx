import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import Loader from "../component/Loading/Loading";
import { RiStarSmileFill, RiStarSmileLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { IoCloseSharp } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { useAppContext } from "../context/Appcontext";

const BuyProduct = () => {
  const { id } = useParams(); //to used a path id traking to used a this hook
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(false); // Changed to false initially
  const [formdata, setFormData] = useState({
    user_name: "",
    phone: "",
    email: "",
    cardnumber: "",
    payment: "",
    cvv_no: "",
  });

  const { addToCart, token } = useAppContext();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  //handle a count function to add cart count
  const handleCart = (id) => {
    if (!id) {
      toast.error("Id not found..");
      return;
    }
    addToCart(id);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const response = await axios.post(
          `/product/findproduct`,
          {
            p_id: [id],
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          },
        );
        if (response.request.status == 200) {
          setProduct(response.data[0]);
        }
      } catch (error) {
        console.log("Error fetching product : ", error);
        toast.error(error.message);
      }
    };
    fetchProduct();
  }, [id]);

  const handleProduct = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Token not Found");
      return;
    }
    try {
      const res = await axios.post(
        `/product/order/product`,
        {
          p_items: [product], //pass a multiple fruits in one orderlist data
          total_price: product.p_offerprice,
          user: formdata,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      if (res.request.status === 200) {
        // console.log(res);
        setLoading(true);
        setFormData({
          user_name: "",
          phone: "",
          email: "",
          cardnumber: "",
          date: "",
          cvv_no: "",
        });
      }
      setTimeout(() => {
        setLoading(false);
        toast.success(res.data.message);
        closeModal();
      }, 3000);
    } catch (error) {
      console.log(`Error ${error}`);
      toast.error(error);
    }
  };

  const closeModal = () => {
    setModel(false);
  };

  if (!product)
    return (
      <div className=" bg-black min-h-78   p-20  text-white justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <>
      {/* Main Content */}
      <div>
        <div className="bg-black select-none">
          <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto ">
            <div className="grid items-start grid-cols-1 lg:grid-cols-5 border border-white rounded-2xl gap-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 ">
              <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                <div className="px-4 py-10 rounded-sm shadow-md relative">
                  <img
                    src={product.image_url}
                    alt="Product"
                    className="w-4/5 aspect-251/171 rounded-sm object-center content-fit mx-auto"
                  />
                  <button
                    type="button"
                    className="absolute top-4 right-4 group-hover:scale-95 transition-all cursor-pointer "
                  >
                    <CiHeart className="text-white text-2xl transition-all hover:scale-[1.05]  duration-200 hover:text-red-500 " />{" "}
                  </button>
                </div>
              </div>
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold text-white">
                  {product.p_name}
                </h3>
                <div className="flex items-center space-x-1 mt-2">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <RiStarSmileFill
                        key={i}
                        className="text-2xl text-white"
                      />
                    ))}
                  <RiStarSmileLine className="text-white text-2xl" />
                  <h4 className="text-slate-500 text-base ml-3!">
                    100 Reviews
                  </h4>
                </div>
                <p className="text-sm text-white mt-4">{product.description}</p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <p className="text-white text-2xl font-semibold">
                    ₹{product.p_offerprice}
                  </p>
                  <p className="text-white text-base">
                    <strike>₹{product.p_price}</strike>{" "}
                    <span className="text-sm ml-1">Tax included</span>
                  </p>
                </div>
                <div className="flex gap-4 mt-12 max-w-md">
                  <button
                    type="button"
                    className="w-full px-4 py-2.5 cursor-pointer outline-none border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-sm"
                    onClick={() => setModel(true)} // Opens modal
                  >
                    Buy now
                  </button>
                  <button
                    type="button"
                    value={id}
                    onClick={() => {
                      handleCart(id);
                    }}
                    className="w-full px-4 py-2.5 cursor-pointer outline-none border border-blue-600 bg-transparent hover:bg-blue-600 duration-400 text-white text-sm font-medium rounded-sm"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6">
              <h3 className="text-xl font-semibold text-white">Reviews(10)</h3>
              <div className="grid md:grid-cols-2 gap-12 mt-6">
                <div className="space-y-3 max-w-md">
                  <div className="flex items-center">
                    <p className="text-sm text-white font-semibold">5.0</p>
                    <RiStarSmileFill className="text-2xl text-white" />
                    <div className="bg-slate-700 rounded-sm w-full h-2 ml-3">
                      <div className="w-2/3 h-full rounded-sm bg-white" />
                    </div>
                    <p className="text-sm text-white font-semibold ml-3">66%</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-white font-semibold">4.0</p>
                    <RiStarSmileFill className="text-2xl text-white" />
                    <div className="bg-slate-700 rounded-sm w-full h-2 ml-3">
                      <div className="w-1/3 h-full rounded-sm bg-white" />
                    </div>
                    <p className="text-sm text-white font-semibold ml-3">33%</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-white font-semibold">3.0</p>
                    <RiStarSmileFill className="text-2xl text-white" />
                    <div className="bg-slate-700 rounded-sm w-full h-2 ml-3">
                      <div className="w-1/6 h-full rounded-sm bg-white" />
                    </div>
                    <p className="text-sm text-white font-semibold ml-3">16%</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-white font-semibold">2.0</p>
                    <RiStarSmileFill className="text-2xl text-white" />
                    <div className="bg-slate-700 rounded-sm w-full h-2 ml-3">
                      <div className="w-1/12 h-full rounded-sm bg-white" />
                    </div>
                    <p className="text-sm text-white font-semibold ml-3">8%</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-white font-semibold">1.0</p>
                    <RiStarSmileFill className="text-2xl text-white" />
                    <div className="bg-slate-700 rounded-sm w-full h-2 ml-3">
                      <div className="w-[6%] h-full rounded-sm bg-white" />
                    </div>
                    <p className="text-sm text-white font-semibold ml-3">6%</p>
                  </div>
                </div>
                <div>
                  <p className="text-white select-none">
                    {product.description}
                  </p>
                  <div>
                    <p className="text-blue-600 text-sm mt-6 cursor-pointer font-semibold">
                      Read all reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {model && (
        <>
          {/* Blur Background Overlay */}
          <div
            className="fixed inset-0  bg-opacity-50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={closeModal}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
            <div className="bg-black border border-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">
                    Complete Purchase
                  </h3>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all text-white"
                  >
                    <IoCloseSharp className="text-white text-2xl" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={product.image_url}
                    alt={product.p_name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-white">
                      {product.p_name}
                    </h4>
                    <p className="text-2xl font-bold text-white">
                      ₹{product.p_offerprice}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleProduct} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      value={formdata.user_name}
                      onChange={handleInput}
                      required
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formdata.email}
                      onChange={handleInput}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formdata.phone}
                      onChange={handleInput}
                      required
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                      placeholder="+91 12345 67890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      name="cardnumber"
                      value={formdata.cardnumber}
                      onChange={handleInput}
                      maxLength="19"
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Payment Type
                      </label>

                      <select
                        name="payment"
                        id="paymet"
                        value={formdata.payment}
                        onChange={handleInput}
                        className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                      >
                        <option className="bg-black" value="">
                          Select Payment
                        </option>
                        <option className="bg-black" value="COD">
                          Cash On Delivery
                        </option>
                        <option className="bg-black" value="ONLINE">
                          Online Payement
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        name="cvv_no"
                        value={formdata.cvv_no}
                        onChange={handleInput}
                        maxLength="4"
                        className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-400 transform hover:-translate-y-1"
                  >
                    {loading
                      ? "Loading.."
                      : ` Pay ₹${product.p_offerprice} Now`}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BuyProduct;
