import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");

  const location = useLocation();
  const params = new URLSearchParams(location.search).get("query");

  const uri = import.meta.env.VITE_SERVER_ENDPOINT;

  useEffect(() => {
    if (params) {
      setSearch(params);
    }
  }, [params]);

  const { data } = useQuery({
    queryKey: ["courses", search],
    queryFn: async () => {
      const res = await axios.get(`${uri}/api/courses/find`, {
        params: {
          query: search,
        },
      });
      return res.data;
    },
    enabled: !!search,
  });

  return (
    <div className="w-full lg:w-[85%] my-0 mx-auto">
      <div className="flex items-stretch border-[#dee2e6] rounded-3xl overflow-hidden mb-6">
        <input
          type="text"
          className="bg-[#f6f7f9] py-2 px-4 flex-auto h-[46px] rounded-l-3xl border border-[#dee2e6] focus:border-[#86b7fe] focus:outline-0 leading-[1.8]"
          placeholder="Type here to search.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="h-[46px] bg-[#146fe6] hover:bg-[#1058b7] px-6 py-2 text-white leading-[1.8] border border-[#dee2e6] ml-[-2px]">
          Search
        </button>
      </div>
      {data?.courses?.length > 0 && (
        <div>
          <h6 className="mb-4 font-bold leading-[1.8]">Courses</h6>
          {data?.courses?.map((course) => (
            <Link
              to={`/new-courses/${course._id}`}
              className="mb-4 cursor-pointer w-full flex flex-col border border-[#dee2e6] rounded-3xl overflow-hidden"
              key={course._id}
            >
              <div className="flex flex-auto p-5">
                <div className="mr-4 rounded overflow-hidden flex-shrink-0">
                  <img
                    className="w-[100px] h-[70px] object-cover"
                    src={course.image}
                    alt={course.name}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h6 className="font-bold truncate">{course.name}</h6>
                  <div></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {search && data?.courses?.length === 0 && (
        <div className="flex w-full mb-4 p-4 relative bg-[#d0e3fb] text-[#0c448d] rounded-3xl border border-[#b9d4f9] leading-[1.8]">
          No results found
        </div>
      )}
    </div>
  );
};

export default Search;
