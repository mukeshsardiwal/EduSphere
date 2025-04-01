import React from "react";
import { Mail, Phone, Globe, User, Briefcase } from "lucide-react";

const ProfileSection = ({ name, email, phone, country, occupation, university, onEdit }) => {
  return (
    <div className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-gradient-to-r from-gray-950 to-gray-900 text-center">
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-700">
        {name.charAt(0)}
      </div>
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <div className="space-y-2 text-gray-700 mt-4">
        <div className="flex items-center justify-between p-2 border-b">
          <User size={16} />
          <span className="flex-1 text-left ml-2">Full Name</span>
          <span>{name || 'NA'}</span>
        </div>
        <div className="flex items-center justify-between p-2 border-b">
          <Mail size={16} />
          <span className="flex-1 text-left ml-2">Email</span>
          <span>{email || 'NA'}</span>
        </div>
        <div className="flex items-center justify-between p-2 border-b">
          <Phone size={16} />
          <span className="flex-1 text-left ml-2">Phone</span>
          <span>{phone || 'NA'}</span>
        </div>
        <div className="flex items-center justify-between p-2 border-b">
          <Globe size={16} />
          <span className="flex-1 text-left ml-2">Country</span>
          <span>{country || 'NA'}</span>
        </div>
        <div className="flex items-center justify-between p-2 border-b">
          <Briefcase size={16} />
          <span className="flex-1 text-left ml-2">Occupation</span>
          <span>{occupation || 'NA'}</span>
        </div>
        <div className="flex items-center justify-between p-2 border-b">
          <span className="flex-1 text-left ml-2">University</span>
          <span>{university || 'NA'}</span>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileSection;
