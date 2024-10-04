import React, { useContext } from "react";
import { CourseCard } from "../components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const Courses = () => {
  const uri = import.meta.env.VITE_SERVER_ENDPOINT;

  const { isAuthenticated } = useContext(AuthContext);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axios.get(
        `${uri}/api/courses`,
        isAuthenticated && {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      return res.data;
    },
  });

  return (
    <div className="mb-12">
      <h4 className="font-bold mb-6 text-xl text-center">Courses</h4>
      <div className="flex flex-wrap justify-center">
        {data?.courses?.map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
