import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ setExpand }) => {
  return (
    <header className="flex items-center justify-between shadow-sm md:px-6 py-1 z-10 sticky top-0 bg-white">
      <div className="flex items-center justify-between w-full mx-auto px-3">
        <button
          className="pr-6 py-1 text-[#9f9f9f] items-center sm:flex lg:hidden"
          onClick={() => setExpand((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </button>
        {/* Logo */}
        <div className="mr-auto">
          <Link to="/">
            <img src="icon.jpg" className="w-[50px]" alt="Logo" />
          </Link>
        </div>

        {/* Search bar and user icon */}
        <div className="flex items-center">
          {/* Search Bar */}
          <div className="w-[300px] h-[40px] bg-[#f6f7f9] rounded-3xl overflow-hidden mx-3 border border-[#dee2e6] hidden md:flex">
            <input
              type="text"
              className="bg-[#f6f7f9] px-3 flex-auto h-full rounded-l-3xl focus:border focus:border-[#86b7fe] focus:outline"
              placeholder="Type here to search.."
            />
            <button className="px-3 border-l h-full hover:bg-[#b9b9bb]">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>

          {/* Search Icon */}

          <Link
            to="/search"
            className="block md:hidden mr-2 ml-4 text-xl text-[#9f9f9f]"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>

          {/* User Icon */}
          <div>
            <Link to="/purchases">
              <FontAwesomeIcon
                icon={faCircleUser}
                className="text-[40px] text-[#146fe6]"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
