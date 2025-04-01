import React from "react";
import Layout from "../Utils/Layout";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const AdminCourses = () => {
  const { courses } = CourseData();

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">All Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses && courses.length > 0 ? (
            courses.map((course) => <CourseCard key={course._id} course={course} />)
          ) : (
            <p>No Courses Yet</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
