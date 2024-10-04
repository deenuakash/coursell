import { faArrowDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Description } from "../components";
import { ModalContext } from "../contexts/ModalContext";
import { AuthContext } from "../contexts/AuthContext";

const Course = () => {
  const { id } = useParams();
  const uri = import.meta.env.VITE_SERVER_ENDPOINT;

  const { setShow } = useContext(ModalContext);
  const { isAuthenticated } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await axios.get(
        `${uri}/api/courses/${id}`,
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

  // Create a ref for the banner
  const bannerRef = useRef(null);

  // State to store the banner height
  const [bannerHeight, setBannerHeight] = useState(0);

  const calculateBannerHeight = () => {
    if (bannerRef.current) {
      const height = bannerRef.current.getBoundingClientRect().height;
      setBannerHeight(height);
    }
  };

  const computePrice = (price) => {
    return price / 100;
  };
  const computeDiscount = (original, discount) => {
    const discountPercentage = 100 * ((original - discount) / original);
    return discountPercentage.toFixed(2);
  };

  const handleBuy = async (courseId) => {
    if (isAuthenticated) {
      purchaseMutation(courseId);
    } else {
      setShow(true);
    }
  };

  const { mutate: purchaseMutation } = useMutation({
    mutationFn: async (courseId) => {
      const res = await axios.post(
        `${uri}/api/courses/buy`,
        {
          courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    // Calculate banner height on load
    calculateBannerHeight();

    // Recalculate on window resize for responsiveness
    window.addEventListener("resize", calculateBannerHeight);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", calculateBannerHeight);
    };
  }, [data]);

  return (
    <div>
      {/* Banner Section */}
      <div ref={bannerRef} className="absolute top-0 left-0 w-full">
        <div className="w-full py-12 bg-[#1058B7]">
          <div className="container mx-auto">
            <div className="flex flex-wrap">
              <div className="md:w-[40%] md:flex-basis-[40%] xl:ml-[10%] ml-0 lg:ml-[5%]">
                <h1 className="text-white text-4xl font-bold leading-[1.8] text-center md:text-left">
                  {data?.course?.name || "Course Name"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div
        className="relative flex flex-col"
        style={{ paddingTop: `${bannerHeight}px` }}
      >
        <div className="order-0 md:absolute top-0 right-0">
          <div className="w-[370px] min-w-[300px] mb-6">
            <div className="rounded-3xl overflow-hidden border h-full flex flex-col shadow-lg">
              <img
                src={data?.course?.image}
                alt={data?.course?.name}
                className="m-h-[220px] w-full object-cover"
              />

              <div className="flex flex-col flex-auto border-t p-5 h-full bg-[#e8f0fa]">
                <p className="text-[12.8px] text-[#9b9b9b] mb-2">PRICE</p>

                {data?.course?.discountPrice !== 0 ? (
                  <div className="mb-2 flex justify-between text-xl">
                    <span className="font-bold">
                      {`₹${computePrice(data?.course?.discountPrice)}`}
                      <strike className="font-light ml-1 text-[14.4px] text-[#9b9b9b]">{`${computePrice(
                        data?.course?.originalPrice
                      )}`}</strike>
                    </span>
                    <span className="text-[#25c16f] font-bold ml-2">
                      {computeDiscount(
                        data?.course?.originalPrice,
                        data?.course?.discountPrice
                      )}
                      % off
                    </span>
                  </div>
                ) : (
                  <div className="mb-2 flex justify-between">
                    <span className="font-bold">
                      {`₹${computePrice(data?.course?.originalPrice)}`}
                    </span>
                  </div>
                )}
                <div className="mb-2 flex justify-between items-center">
                  Choose Currency:
                  <div className="relative w-[80px]">
                    <select
                      className="pl-2 pr-8 border py-1 rounded-2xl appearance-none bg-white focus:border-[#86b7fe] focus:outline"
                      name="currency"
                      id="currency"
                      defaultValue="INR"
                    >
                      <option>AUD</option>
                      <option>CAD</option>
                      <option>CNY</option>
                      <option>EUR</option>
                      <option>GBP</option>
                      <option>INR</option>
                      <option>JPY</option>
                      <option>USD</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
                <Link
                  className="mt-auto block w-full rounded-3xl bg-[#146fe6] py-2 px-6 text-white text-center leading-[1.8]"
                  onClick={() => handleBuy(data.course._id)}
                >
                  Buy Now
                </Link>
                <Link className="mt-2 block w-full rounded-3xl bg-[#146fe6] py-2 px-6 text-white text-center leading-[1.8]">
                  Pay via Crypto
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1">
          <div className="w-full lg:w-[50%] md:w-[40%]">
            <Description data={data}>
              <p className="font-bold mb-6">Starts 2nd August 2024</p>
              <p className="mb-4">
                Complete syllabus - https://blog.100xdevs.com/
              </p>
              <p className="mb-4">
                In the Web Development Cohort, we'll be diving deep into the
                MERN stack from the basics. The goal is for you to be able to
                understand any MERN codebase out there.
              </p>{" "}
              <p className="mb-4">
                We'll also be diving into Devops, both basic and advance.
              </p>
              <p>
                In the Web3 Cohort, we'll be going 0-100 in the Solana and ETH
                blockchain
              </p>
            </Description>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
