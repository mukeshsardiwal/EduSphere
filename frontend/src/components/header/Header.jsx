import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";


const Header = ({ isAuth, logoutUser }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-3  bg-gradient-to-r from-gray-950 to-gray-900 text-white">
      <div className="text-xl font-bold mb-4 md:mb-0 hover:cursor-pointer">
        <Link to="/">EduSphere</Link>
      </div>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/courses" className="hover:text-gray-400">Courses</Link>
        <Link to="/about" className="hover:text-gray-400">About</Link>

        {/* Conditionally show "Account" if the user is logged in */}
        {isAuth && <Link to="/account" className="rounded-md hover:text-gray-400">Account</Link>}
      </div>
      <div className="user-actions mt-4 md:mt-0">
        {isAuth ? (
          // Show "Logout" button when the user is logged in
          <button
            onClick={logoutUser}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            <IoIosLogOut />

          </button>
        ) : (
          // Show "Login" button when the user is not logged in
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
