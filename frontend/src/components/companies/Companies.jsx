import React from "react";
import companiesData from "../../assets/companiesData"; // Adjust import path if needed

const Companies = () => {
  return (
      <div className="container mx-auto px-4 bg-gradient-to-b from-gray-950 to-black rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white-900 mb-12">
          Companies Our Students Get Placed
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 gap-4 justify-center items-center">
          {companiesData.map((company) => (
            <img
              src={company.logo}
              className="w-10 h-10 mx-auto mb-4"
            />
          ))}
        </div>
      </div>
  );
};

export default Companies;
