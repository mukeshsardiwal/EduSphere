import React from "react";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = ({ user }) => {
  const params = useParams();
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      {user && (
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Payment Successful</h2>
          <p className="mb-2">Your course subscription has been activated.</p>
          <p className="mb-4">Reference no - <span className="font-mono text-yellow-400">{params.id}</span></p>
          <Link to={`/${user._id}/dashboard`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
