import React from "react";
import { MdDashboard } from "react-icons/md";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProfileSection from "../ProfileSection/ProfileSection";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();


  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 bg-gradient-to-l from-gray-950 to-gray-900 border-r-2 border-gray-300  flex flex-col space">
        <button className="flex items-center gap-2 w-full text-left p-3  bg-gray-800 text-white cursor-default">
          Profile
        </button>
        <button
          onClick={() => navigate(`/${user._id}/dashboard`)}
          className="flex items-center gap-2 w-full text-left p-3  bg-gray-800 text-white hover:bg-gray-700"
        >
          <MdDashboard /> Dashboard
        </button>
        {user.role === "admin" && (
          <button
            onClick={() => navigate(`/admin/dashboard`)}
            className="flex items-center gap-2 w-full text-left p-3  bg-gray-800 text-white hover:bg-gray-700"
          >
            <MdDashboard /> Admin Dashboard
          </button>
        )}

      </aside>

      {/* Profile Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-10 bg-gradient-to-r from-gray-950 to-gray-900">
        {user && (
          <ProfileSection
            name={user.name}
            email={user.email}
            phone={user.phone}
            country={user.country}
            occupation={user.occupation}
            university={user.university}
            onEdit={() => navigate("/edit-profile")}
          />
        )}
      </div>
    </div>
  );
};

export default Account;
