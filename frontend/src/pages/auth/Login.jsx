import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchMyCourse } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-950 to-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 h-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">Login</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white p-3 rounded-md hover:bg-gray-700 transition duration-300"
            disabled={btnLoading}
          >
            {btnLoading ? "Please Wait..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
        <p className="text-center mt-2">
          <Link to="/forgot" className="text-blue-500 hover:underline">Forgot password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;