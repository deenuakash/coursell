import React from "react";

const Description = ({ data, children }) => {
  return (
    <div>
      <div className="w-full border-b mb-6">
        <button className="py-2 pl-1 pr-4 text-[#146fe6] border-b-4 border-[#146fe6] text-center font-bold">
          Overview
        </button>
      </div>
      {data?.course?.validity && (
        <h6 className="font-bold mb-2"> Validity : {data?.course?.validity}</h6>
      )}
      <div className="mt-6">
        <h6 className="font-bold mb-2">Description</h6>
      </div>
      {children}
    </div>
  );
};

export default Description;
