import React from "react";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Dashbord = () => {
  const { mycourse } = CourseData();
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-950 to-gray-900 p-10 text-white">
      <h1 className="text-4xl font-bold text-center mb-6">Dashboard</h1>

      <h6 className="text-3xl font-bold text-center mb-6">All Enrolled Courses</h6>
      <div className="flex flex-wrap justify-center h-96 w-56">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p className="text-center text-lg">No course Enrolled Yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashbord;
