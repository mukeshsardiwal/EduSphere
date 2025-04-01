import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { UserData } from "../../context/UserContext";

const Sidebar = () => {
  const { user } = UserData();
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4 shadow-lg">
      <ul className="space-y-6">
        <li>
          <Link to="/admin/dashboard" className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg">
            <AiFillHome className="text-xl" />
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/course" className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg">
            <FaBook className="text-xl" />
            <span>Courses</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/new" className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg">
            <FaBook className="text-xl" />
            <span>Add Course</span>
          </Link>
        </li>

        {user && user.mainrole === "superadmin" && (
          <li>
            <Link to="/admin/users" className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg">
              <FaUserAlt className="text-xl" />
              <span>Users</span>
            </Link>
          </li>
        )}

        <li>
          <Link to="/account" className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg">
            <AiOutlineLogout className="text-xl" />
            <span>Profile Page</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
