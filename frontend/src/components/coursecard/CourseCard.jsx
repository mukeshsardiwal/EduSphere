import React from "react";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting course");
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center text-gray-900 border border-gray-300 hover:shadow-xl transition-all duration-300">
      <img
        src={`${server}/${course.image}`}
        alt="Course"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold text-center">{course.title}</h3>
      <p className="text-gray-500 text-sm">Instructor: {course.createdBy}</p>
      <p className="text-gray-500 text-sm">Duration: {course.duration} weeks</p>
      <p className="text-lg font-bold text-blue-600 mt-2">₹{course.price}</p>

      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            user.subscription.includes(course._id) ? (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200"
              >
                Study
              </button>
            ) : (
              <button
                onClick={() => navigate(`/course/${course._id}`)}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200"
              >
                Get Started
              </button>
            )
          ) : (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg font-medium transition duration-200"
            >
              Study
            </button>
          )}
        </>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200"
        >
          Get Started
        </button>
      )}

      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="mt-4 w-full flex items-center justify-center bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg font-medium transition duration-200"
        >
          <MdDelete className="mr-2 text-lg" /> Delete
        </button>
      )}
    </div>
  );
};

export default CourseCard;
