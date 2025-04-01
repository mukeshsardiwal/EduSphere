import React from "react";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();

  console.log(courses);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-gray-200 py-10 px-5">
      <h2 className="text-3xl font-semibold text-center mb-6">Available Courses</h2>

      {/* Grid Layout for Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mx-auto">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id}>
              <CourseCard course={course} />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-lg">No Courses Yet!</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
