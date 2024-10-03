import { useQuery } from "@tanstack/react-query";
import { CourseCard, HomeSection, Slider } from "../components";
import { courses } from "../utils/courses";
import axios from "axios";

const Home = () => {
  const uri = import.meta.env.VITE_SERVER_ENDPOINT;
  const { data } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axios.get(`${uri}/api/courses`);
      return res.data
    },
  });
  return (
    <>
      <Slider />
      <HomeSection title="Featured">
        <div className="flex flex-wrap justify-center">
          {data?.courses?.
            filter((_, i) => i < 3)
            .map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
        </div>
      </HomeSection>
      <div className="mt-5">
        <img src="./why-100x.jpeg" alt="" />
      </div>
      <HomeSection title="About 100x Devs">
        <div
          className="rounded-2xl"
          style={{
            background:
              "linear-gradient(94.98deg, rgb(232, 221, 255) 1.59%, rgb(225, 185, 145) 94.61%)",
          }}
        >
          <div className="p-5">
            <p className="mb-4 leading-[1.8]">Welcome to 100xdevs.</p>
            <p className="mb-4 leading-[1.8]">
              This is an initiative by <b>Harkirat Singh</b> to personally
              mentor folks in the field of Programming.
            </p>
            <p className="mb-4 leading-[1.8]">
              Harkirat strongly feels that today you are either a 1x engineer or
              a 100x engineer and nothing in the middle, and his hope is to take
              everyone in this community to be a <b>100x Engineer</b>.
            </p>
            <p className="mb-4 leading-[1.8]">
              Join him in his first course on Full Stack development with a
              heavy focus on Open source projects to learn programming
              practically.
            </p>
          </div>
        </div>
      </HomeSection>
    </>
  );
};

export default Home;
