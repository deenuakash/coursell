import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Purchases = () => {
  const uri = import.meta.env.VITE_SERVER_ENDPOINT;

  const { data } = useQuery({
    queryKey: ["purchases"],
    queryFn: async () => {
      const res = await axios.get(`${uri}/api/courses/purchases`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      return res.data;
    },
  });
  return (
    <div>
      <div className="mb-12 flex justify-between items-center">
        <h3 className="text-2xl font-bold">My Purchases</h3>
        <Link
          className="m-1 rounded-3xl bg-[#146fe6] py-1 px-3 text-white text-center leading-[1.8] text-sm"
          to="/new-courses"
        >
          Courses
        </Link>
      </div>
      {data?.courses?.map((course) => (
        <div className="w-[370px] min-w-[300px] mb-6" key={course._id}>
          <div className="rounded-3xl overflow-hidden border h-full flex flex-col shadow-lg">
            <img
              src={course?.image}
              alt={course?.name}
              className="m-h-[220px] w-full object-cover"
            />

            <div className="flex flex-col flex-auto border-t p-5 h-full bg-[#e8f0fa]">
              <div className="flex items-center justify-start mb-4">
                <div className="text-lg font-bold mb-4">{course?.name}</div>
              </div>

              <Link
                className="mt-auto block w-full rounded-3xl bg-[#146fe6] py-2 px-6 text-white text-center leading-[1.8]"
                to={`/purchases/${course?._id}`}
              >
                View
              </Link>
              <Link className="mt-2 block w-full rounded-3xl bg-[#146fe6] py-2 px-6 text-white text-center leading-[1.8]">
                View invoice
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Purchases;
