import React, { useState } from "react";
import { FaShippingFast, FaLeaf, FaHandHoldingHeart } from "react-icons/fa";
import { MdOutlinePayment, MdLocalOffer } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";
import { GiFruitBowl, GiFarmTractor, GiHealthNormal } from "react-icons/gi";

const InfoSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const features = [
    {
      icon: <GiFarmTractor className="text-4xl text-green-400 mb-4" />,
      title: "Farm to Table",
      description:
        "Fresh produce sourced directly from local farms within 24 hours of harvest.",
      detail:
        "We partner with over 50 local farms to bring you the freshest seasonal produce.",
    },
    {
      icon: <FaShippingFast className="text-4xl text-blue-400 mb-4" />,
      title: "Lightning Fast Delivery",
      description:
        "Order today and get your fresh fruits and vegetables delivered within hours.",
      detail:
        "Our temperature-controlled delivery fleet ensures peak freshness upon arrival.",
    },
    {
      icon: <GiFruitBowl className="text-4xl text-orange-400 mb-4" />,
      title: "Premium Quality",
      description:
        "Hand-picked produce that meets our strict quality standards.",
      detail:
        "Every item is inspected for ripeness, color, and quality before reaching you.",
    },
    {
      icon: <GiHealthNormal className="text-4xl text-red-400 mb-4" />,
      title: "Nutrient-Rich",
      description:
        "Packed with vitamins, minerals, and antioxidants for your health.",
      detail:
        "Our produce retains up to 40% more nutrients than supermarket alternatives.",
    },
    {
      icon: <MdOutlinePayment className="text-4xl text-green-400 mb-4" />,
      title: "Secure Checkout",
      description:
        "Multiple payment options for a seamless shopping experience.",
      detail:
        "We accept all major credit cards, digital wallets, and buy-now-pay-later options.",
    },
    {
      icon: <FiRefreshCcw className="text-4xl text-purple-400 mb-4" />,
      title: "Freshness Guarantee",
      description:
        "Not satisfied? We'll replace it or refund your money, no questions asked.",
      detail:
        "Our 100% satisfaction guarantee covers all produce for up to 48 hours after delivery.",
    },
  ];

  return (
    <section id="services" className="bg-black py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block">
            Why Choose Our Green Store
            <span className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-green-400 to-blue-500 rounded-full"></span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We bring nature's best to your table with the freshest, most
            nutritious fruits and vegetables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative bg-gray-900 rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-800 ${
                activeIndex === index
                  ? "bg-gray-800 border-green-500"
                  : "hover:border-green-400"
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Glow Effect */}
              {activeIndex === index && (
                <div className="absolute inset-0 rounded-2xl bg-green-500 opacity-10 blur-xl"></div>
              )}

              <div className="relative z-10">
                <div className="flex justify-center mb-4 transform transition-transform duration-300 hover:scale-110">
                  <div
                    className={`p-4 rounded-full bg-gray-800 ${activeIndex === index ? "animate-pulse" : ""}`}
                  >
                    {feature.icon}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-400 mb-3">{feature.description}</p>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeIndex === index
                      ? "max-h-20 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-500 text-sm pt-2 border-t border-gray-700">
                    {feature.detail}
                  </p>
                </div>

                <button className="mt-4 text-green-400 text-sm font-medium flex items-center mx-auto hover:text-green-300 transition-colors">
                  {activeIndex === index ? "Learn More" : "Hover to Learn More"}
                  <span
                    className={`ml-1  transform transition-transform duration-300 inline-block ${
                      activeIndex === index ? "translate-x-1" : ""
                    }`}
                  >
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-linear-to-r from-green-500 to-green-600 text-white font-medium rounded-full hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25">
            Explore Our Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
