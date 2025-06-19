import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function SignInPopUp({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-slate-50 rounded-lg shadow-xl p-6 max-w-md w-full mx-4 z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <IoClose size={24} />
        </button>
        
        {/* Content */}
        <div className="text-center bg-slate-50">
          <h2 className="text-2xl font-bold text-slate-700 mb-4">
            Sign In to Unlock More Features
          </h2>
          <p className="text-gray-600 mb-6">
            Get access to save listings, create listings, and contact property owners directly.
          </p>
          
          {/* Features list */}
          <ul className="text-left mb-6 space-y-2">
            <li className="flex items-center text-gray-700">
              <span className="text-green-500 mr-2">✓</span>
              create your listings
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-green-500 mr-2">✓</span>
              Update your listings
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-green-500 mr-2">✓</span>
              Contact property owners
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-green-500 mr-2">✓</span>
              Check your all listings 
            </li>
          </ul>
          
          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link
              to="/sign-in"
              className="block w-full bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors"
              onClick={onClose}
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="block w-full bg-slate-200 text-slate-700 py-3 rounded-lg hover:bg-slate-300 transition-colors"
              onClick={onClose}
            >
              Create an Account
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default SignInPopUp;