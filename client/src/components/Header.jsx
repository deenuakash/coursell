import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ModalContext } from "../contexts/ModalContext";

const Header = ({ setExpand }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { setShow } = useContext(ModalContext);

  const { pathname } = useLocation();

  const [search, setSearch] = useState("");
  return (
    <header className="flex items-center justify-between shadow-sm md:px-6 py-1 z-10 sticky top-0 bg-white">
      <div className="flex items-center justify-between w-full mx-auto px-3">
        <button
          className="pr-6 py-1 text-[#9f9f9f] items-center sm:flex lg:hidden"
          onClick={() => setExpand((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </button>
        <div className="mr-auto">
          <Link to="/">
            <img src="icon.jpg" className="w-[50px]" alt="Logo" />
          </Link>
        </div>

        <div className="flex items-center">
          {pathname !== "/search" && (
            <div className="w-[300px] h-[42px] bg-[#f6f7f9] rounded-3xl overflow-hidden mx-4 border border-[#dee2e6] hidden md:flex">
              <input
                type="text"
                className="bg-[#f6f7f9] px-3 flex-auto h-full rounded-l-3xl focus:border focus:border-[#86b7fe] focus:outline"
                placeholder="Type here to search.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Link
                to={search ? `/search?query=${search}` : "/search"}
                onClick={() => setSearch("")}
              >
                <button className="px-3 border-l h-full hover:bg-[#b9b9bb]">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </Link>
            </div>
          )}

          <Link
            to="/search"
            className="block md:hidden mr-2 ml-4 text-xl text-[#9f9f9f]"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>

          {isAuthenticated ? (
            <Link to="/purchases">
              <FontAwesomeIcon
                icon={faCircleUser}
                className="text-[40px] text-[#146fe6]"
              />
            </Link>
          ) : (
            <div className="text-white">
              <button
                className="bg-[#146fe6] py-2 px-6 mr-2 rounded-3xl"
                onClick={() => setShow(true)}
              >
                Signup
              </button>
              <button
                className="bg-[#146fe6] py-2 px-6 rounded-3xl"
                onClick={() => setShow(true)}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
