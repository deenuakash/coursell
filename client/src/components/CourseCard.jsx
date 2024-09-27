const CourseCard = ({ course }) => {
  const computePrice = (price) => {
    return price / 100;
  };
  const computeDiscount = (original, discount) => {
    const discountPercentage = 100 * ((original - discount) / original);
    return discountPercentage.toFixed(2);
  };
  return (
    <div className="w-[396px] p-2">
      <div className="rounded-xl overflow-hidden border h-full flex flex-col">
        <img
          src={course.image}
          alt={course.name}
          className="h-[200px] w-full object-cover"
        />

        <div className="flex flex-col flex-auto border-t p-5 h-full">
          <div className="flex items-center justify-center mb-4">
            <div className="text-lg font-bold mb-4">{course.name}</div>
          </div>

          <div className="mb-2 flex justify-between">
            <span className="font-bold">
              {`₹${computePrice(course.discountPrice)}`}
              <strike className="font-light ml-1 text-[#9b9b9b]">{`${computePrice(
                course.originalPrice
              )}`}</strike>
            </span>
            <span className="text-[#25c16f] font-bold ml-2">
              {computeDiscount(course.originalPrice, course.discountPrice)}% off
            </span>
          </div>

          <button className="mt-auto block w-full rounded-3xl bg-[#146fe6] py-2 px-6 text-white">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
