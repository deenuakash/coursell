import { CourseCard, HomeSection, Slider } from "../components";

const Home = () => {
  const courses = [
    {
      name: "Complete Web Development + Devops + Blockchain Cohort",
      image:
        "https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.07833836520330406.png",
      originalPrice: 849900,
      discountPrice: 598900,
    },
    {
      name: "Complete Web development + Devops Cohort",
      image:
        "https://appxcontent.kaxa.in/paid_course3/2024-07-09-0.40079486154772104.png",
      originalPrice: 599900,
      discountPrice: 498900,
    },
    {
      name: "Complete Web3/Blockchain Cohort",
      image:
        "https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.8201249093606604.png",
      originalPrice: 599900,
      discountPrice: 498900,
    },
    {
      name: "Complete Web Development Cohort",
      image:
        "https://appxcontent.kaxa.in/paid_course3/2024-07-09-0.27031454992467685.png",
      originalPrice: 399900,
      discountPrice: 298900,
    },
    {
      name: "Complete Devops Cohort",
      image:
        "https://appxcontent.kaxa.in/paid_course3/2024-07-09-0.6125162399767927.png",
      originalPrice: 399900,
      discountPrice: 298900,
    },
    {
      name: "Live 0-100 Complete",
      image:
        "https://appx-wsb-gcp-mcdn.akamai.net.in/teachcode/admin/COURSE/cover/1699610005757WhatsApp-Image-2023-11-10-at-3.16.18-PM.jpeg",
      originalPrice: 799900,
      discountPrice: 558900,
    },
    {
      name: "Super 30 Noida",
      image:
        "https://appxcontent.kaxa.in/paid_course3/2024-09-19-0.309826215873515.png",
      originalPrice: 9970000,
      discountPrice: 0,
    },
    {
      name: "Live 0-1",
      image:
        "https://appx-wsb-gcp-mcdn.akamai.net.in/teachcode/admin/COURSE/cover/1699610063563WhatsApp-Image-2023-11-08-at-8.31.14-PM.jpeg",
      originalPrice: 599900,
      discountPrice: 348900,
    },
    {
      name: "Live 1-100",
      image:
        "https://appx-wsb-gcp-mcdn.akamai.net.in/teachcode/admin/COURSE/cover/1699610081268WhatsApp-Image-2023-11-08-at-8.31.13-PM.jpeg",
      originalPrice: 599900,
      discountPrice: 398900,
    },
    {
      name: "Live Full Stack Open Source Cohort 1 (Finished)",
      image:
        "https://appx-wsb-gcp-mcdn.akamai.net.in/paid_course3/2023-11-10-0.3523174787735883.jpeg",
      originalPrice: 499900,
      discountPrice: 398900,
    },
  ];

  return (
    <>
      <Slider />
      <HomeSection title="Featured">
        <div className="flex flex-wrap justify-evenly">
          {courses
            .filter((_, i) => i < 3)
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
