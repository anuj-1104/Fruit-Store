import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { SiCodefresh, SiFacebook, SiTwitter, SiInstagram, SiLinkedin } from "react-icons/si";
import { toast } from "react-toastify";
import { FaApple } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <div className="w-full bg-black text-white">
      <footer className="relative overflow-hidden px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm pt-12 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Fruits-Store</h1>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              asperiores dolore dolorem minus nulla quae facere consequuntur,
              natus debitis, nostrum corrupti dignissimos iste unde voluptate
              repudiandae. Dolorem rerum quo molestiae!
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col lg:items-center">
            <h2 className="font-semibold text-lg mb-6 text-white">
              Quick Links
            </h2>
            <div className="flex flex-col space-y-3">
              <Link
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                to="/about"
              >
                About us
              </Link>
              <Link
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                to="/careers"
              >
                Careers
              </Link>
              <Link
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                to="/contact"
              >
                Contact us
              </Link>
              <Link
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                to="/privacy"
              >
                Privacy policy
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="font-semibold text-lg mb-6 text-white">
              Subscribe to our newsletter
            </h2>
            <div className="space-y-4 max-w-sm">
              <p className="text-gray-300">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  className="rounded-md bg-gray-800 text-white outline-none w-full h-11 px-4 border border-gray-700 focus:border-cyan-400 transition-colors"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="bg-linear-to-r active:scale-95  from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 px-6 h-11 text-white rounded-md font-medium"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 mt-10 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Powered by CodeFresh</span>
          </div>
          <p className="text-gray-400 text-center">
            Copyright © {currentYear} Fruits-Store. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
