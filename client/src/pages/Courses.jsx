import React from "react";
import { courses } from "../utils/courses";
import { CourseCard } from "../components";

const Courses = () => {
  return (
    <div className="mb-12">
      <h4 className="font-bold mb-6 text-xl text-center">Courses</h4>
      <div className="flex flex-wrap">
        {courses?.map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
