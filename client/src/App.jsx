import { Outlet } from "react-router-dom";
import { Footer, Header, SideBar } from "./components";
import { useEffect, useState } from "react";

function App() {
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setExpand(true);
      } else {
        setExpand(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="font-sans relative">
      <Header setExpand={setExpand} />
      <div className="flex">
        {/* Sidebar */}
        <SideBar expand={expand} />

        {/* Content Area */}
        <div
          className={`transition-all duration-300 ${
            expand ? "ml-[280px]" : "ml-0"
          } w-full`}
        >
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center ">
              <div className="flex flex-col justify-between mt-12 min-h-[85vh] max-w-full px-3 w-[80%]">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
