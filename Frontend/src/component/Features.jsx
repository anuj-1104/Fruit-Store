import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";

const InfoSection = () => {
  const features = [
    {
      icon: (
        <FaShippingFast className="text-4xl text-blue-500 mb-4 animate-pulse" />
      ),
      title: "Lightning Fast",
      description: `Fast Delivery: Your order, at your door —quick and on time.`,
    },
    {
      icon: (
        <MdOutlinePayment className="text-4xl text-green-500 mb-4 animate-pulse" />
      ),
      title: "Multiple Payment Options",
      description: "Online Payment: Secure, easy, and hassle-free checkout.",
    },
    {
      icon: (
        <FiRefreshCcw className="text-4xl text-purple-500 mb-4 animate-pulse  " />
      ),
      title: "Hand-Picked Quality",
      description:
        "Produce is sourced directly from farms and delivered to the store every day for peak freshness.",
    },
  ];

  return (
    <section id="services" className="bg-black py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">What We Offer</h2>
          <p className="text-gray-400 text-lg">
            We provide top-notch services to bring your ideas to life.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10  ">
          {features.map(
            (
              feature,
              index //start with a zero index
            ) => (
              <div
                key={index}
                className="text-center border-2 border-white transform hover:-translate-y-1 duration-400 hover:bg-white/10 p-3 rounded-2xl "
              >
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
