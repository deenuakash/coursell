import { Link, useLocation } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { pathname } = useLocation();
  const computePrice = (price) => {
    return price / 100;
  };
  const computeDiscount = (original, discount) => {
    const discountPercentage = 100 * ((original - discount) / original);
    return discountPercentage.toFixed(2);
  };
  return (
    <div className="w-[396px] min-w-[300px] px-3 mb-6">
      <div className="rounded-3xl overflow-hidden border h-full flex flex-col">
        <img
          src={course.image}
          alt={course.name}
          className="m-h-[200px] w-full object-cover"
        />

        <div className="flex flex-col flex-auto border-t p-5 h-full">
          <div className="flex items-center justify-start mb-4">
            <div className="text-lg font-bold mb-4">{course.name}</div>
          </div>

          {course.discountPrice !== 0 ? (
            <div className="mb-2 flex justify-between">
              <span className="font-bold">
                {`₹${computePrice(course.discountPrice)}`}
                <strike className="font-light ml-1 text-[14.4px] text-[#9b9b9b]">{`${computePrice(
                  course.originalPrice
                )}`}</strike>
              </span>
              <span className="text-[#25c16f] font-bold ml-2">
                {computeDiscount(course.originalPrice, course.discountPrice)}%
                off
              </span>
            </div>
          ) : (
            <div className="mb-2 flex justify-between">
              <span className="font-bold">
                {`₹${computePrice(course.originalPrice)}`}
              </span>
            </div>
          )}
          {course?.purchased ? (
            <Link
              to={`/purchases/${course._id}`}
              className="mt-auto block w-full rounded-3xl bg-[#146fe6] py-2 px-6 text-white text-center leading-[1.8]"
            >
              View Content
            </Link>
          ) : (
            <Link
              to={`/new-courses/${course._id}`}
              className="mt-auto block w-full rounded-3xl bg-[#146fe6] py-2 px-6 text-white text-center leading-[1.8]"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
