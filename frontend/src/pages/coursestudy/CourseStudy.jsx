import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      {course && (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg text-center border border-gray-300">
          <img
            src={`${server}/${course.image}`}
            alt="Course"
            className="w-72 h-48 object-cover mx-auto rounded-md mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
          <h4 className="text-gray-700 text-lg mt-2">{course.description}</h4>
          <h5 className="text-gray-800 mt-2 font-medium">
            <span className="font-semibold">by - </span>
            {course.createdBy}
          </h5>
          <h5 className="text-gray-800 font-medium">
            <span className="font-semibold">Duration - </span>
            {course.duration} weeks
          </h5>
          <Link
            to={`/lectures/${course._id}`}
            className="inline-block mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
          >
            View Lectures
          </Link>
        </div>
      )}
    </div>
  );
};

export default CourseStudy;
