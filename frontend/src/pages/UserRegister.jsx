import React from "react";
import { Link } from "react-router"; 

const UserRegister = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          User Register
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Register
          </button>
        </form>

        {/* Links at the bottom */}
        <div className="mt-6 text-center">
          <span className="text-gray-500">Already have an account? </span>
          <Link
            to="/user/login"
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
            Login
          </Link>
        </div>

        <div className="mt-2 text-center">
          <span className="text-gray-500">Or register as </span>
          <Link
            to="/food-partner/register"
            className="text-green-600 dark:text-green-400 font-medium hover:underline">
            Food Partner
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
