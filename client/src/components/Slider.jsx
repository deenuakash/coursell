import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Slider = () => {
  const items = [
    {
      name: "Complete Web3 & Web Development Cohort",
      image:
        "https://appxcontent.kaxa.in/subject/2024-07-07-0.9522250790418232.png",
      to: "/",
    },
    // {
    //   name: "Complete Blockchain Cohort",
    //   image:
    //     "https://appxcontent.kaxa.in/subject/2024-07-05-0.8025085370209641.jpeg",
    //   to: "/",
    // },
    // {
    //   name: "Complete Web Development Cohort",
    //   image:
    //     "https://appxcontent.kaxa.in/subject/2024-07-05-0.3715048534115637.jpeg",
    //   to: "/",
    // },
  ];
  return (
    <div className="relative">
      <div className="rounded-3xl overflow-hidden">
        {items.map((item, i) => (
          <img key={i} src={item.image} alt={item.name} className="w-full" />
        ))}
      </div>
      <button className="absolute left-[-30px] top-1/2 -translate-y-1/2 p-2 text-[#4f4f4f]">
        <FontAwesomeIcon icon={faCircleChevronLeft} />
      </button>
      <button className="absolute right-[-30px] top-1/2 -translate-y-1/2  p-2 text-[#4f4f4f]">
        <FontAwesomeIcon icon={faCircleChevronRight} />
      </button>
    </div>
  );
};

export default Slider;
