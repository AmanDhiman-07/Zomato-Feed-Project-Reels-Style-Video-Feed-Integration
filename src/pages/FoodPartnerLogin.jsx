import React from "react";
import { Link } from "react-router";

const FoodPartnerLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          Food Partner Login
        </h2>
        <form className="space-y-4">
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
            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Links at the bottom */}
        <div className="mt-6 text-center space-y-2">
          <div>
            <span className="text-gray-500">Don't have an account? </span>
            <Link
              to="/food-partner/register"
              className="text-green-600 dark:text-green-400 font-medium hover:underline"
            >
              Register as Food Partner
            </Link>
          </div>
          <div>
            <span className="text-gray-500">Or register as </span>
            <Link
              to="/user/register"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Normal User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
