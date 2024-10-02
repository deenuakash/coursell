import { Outlet } from "react-router-dom";
import { Footer, Header, Modal, SideBar } from "./components";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "./contexts/ModalContext";

function App() {
  const [expand, setExpand] = useState(true);
  const { show } = useContext(ModalContext);

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
            expand ? "lg:ml-[280px]" : "ml-0"
          } w-full`}
        >
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center ">
              <div className="flex flex-col justify-between mt-12 min-h-[85vh] max-w-full px-3 w-[90%] lg:w-[80%] relative">
                <Outlet />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && <Modal />}
    </div>
  );
}

export default App;
