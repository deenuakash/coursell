import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const PurchasedCourse = () => {
  const [activeTab, setActiveTab] = useState("content");
  const { id } = useParams();
  const uri = import.meta.env.VITE_SERVER_ENDPOINT;

  const { data } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await axios.get(`${uri}/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      return res.data;
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center">
        <FontAwesomeIcon
          icon={faCircleChevronLeft}
          className="pr-6 m-1 text-gray-500 text-lg"
        />
        <h3 className="text-3xl flex-grow font-bold">{data?.course?.name}</h3>
      </div>
      <div className="w-full border-b mb-6">
        <button
          className={`py-2 pl-1 pr-4 text-center ${
            activeTab === "content"
              ? "text-[#146fe6] border-b-4 border-[#146fe6] font-bold"
              : "border-b-0"
          }`}
          onClick={() => setActiveTab("content")}
        >
          Content
        </button>
        <button
          className={`py-2 pl-1 pr-4 text-center ${
            activeTab === "live"
              ? "text-[#146fe6] border-b-4 border-[#146fe6] font-bold"
              : "border-b-0"
          }`}
          onClick={() => setActiveTab("live")}
        >
          Live & Upcoming
        </button>
      </div>
      {activeTab === "content" && (
        <div className="flex w-full mb-4 p-4 relative bg-[#d0e3fb] text-[#0c448d] rounded-3xl border border-[#b9d4f9] leading-[1.8]">
          No Content available
        </div>
      )}
      {activeTab === "live" && (
        <div className="flex w-full mb-4 p-4 relative bg-[#d0e3fb] text-[#0c448d] rounded-3xl border border-[#b9d4f9] leading-[1.8]">
          No live videos available
        </div>
      )}
    </div>
  );
};

export default PurchasedCourse;
