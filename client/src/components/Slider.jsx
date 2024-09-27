import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Slider = () => {
  const [index, setIndex] = useState(0);

  const items = [
    {
      name: "Complete Web3 & Web Development Cohort",
      image:
        "https://appxcontent.kaxa.in/subject/2024-07-07-0.9522250790418232.png",
      to: "/",
    },
    {
      name: "Complete Blockchain Cohort",
      image:
        "https://appxcontent.kaxa.in/subject/2024-07-05-0.8025085370209641.jpeg",
      to: "/",
    },
    {
      name: "Complete Web Development Cohort",
      image:
        "https://appxcontent.kaxa.in/subject/2024-07-05-0.3715048534115637.jpeg",
      to: "/",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="relative">
        <div className="relative overflow-hidden w-full rounded-3xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((item, i) => (
              <img
                key={i}
                src={item.image}
                alt={item.name}
                className="w-full flex-shrink-0 object-cover"
              />
            ))}
          </div>
        </div>
        <button
          className="absolute left-[-30px] top-1/2 -translate-y-1/2 p-2 text-[#4f4f4f]"
          onClick={() =>
            setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
          }
        >
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
        <button
          className="absolute right-[-30px] top-1/2 -translate-y-1/2  p-2 text-[#4f4f4f]"
          onClick={() =>
            setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
          }
        >
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </div>
      <ul className="flex align-center justify-center mt-2">
        {items.map((_, i) => (
          <li key={i} className="mx-2">
            <button
              className={`rounded-full w-2 h-2 ${
                i === index ? "bg-black" : "bg-gray-300"
              }`}
              onClick={() => setIndex(i)}
            >
              {/* {i} */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slider;
