import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import { navItems1, navItems2 } from "../utils/navItems";

const SideBar = ({ expand }) => {
  console.log(expand);
  return (
    <div
      className={` ${
        expand ? "w-[280px]" : "w-0"
      } lg:w-[280px] lg:block  m-auto  bg-[#e8f1fd] fixed top-14 left-0 z-5 h-full pb-24 overflow-auto text-[#4f4f4f]`}
    >
      <ul className="p-6 flex-col my-0 flex flex-wrap list-none text-nowrap">
        <li className="pl-4 py-4 text-[#6d7278] text-xs font-bold text-nowrap">
          MAIN MENU
        </li>
        {navItems1.map((navItem, i) => (
          <li className="mb-2 flex flex-col leading-[1.8]" key={i}>
            <NavLink
              to={navItem.path}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold px-4 py-2 text-[#146fe6]"
                  : "px-4 py-2"
              }
            >
              <FontAwesomeIcon icon={navItem.icon} className="mr-2" />
              {navItem.item}
            </NavLink>
          </li>
        ))}
        <div className="border-t pt-3 mt-2 ">
          {navItems2.map((navItem, i) => (
            <li className="mb-2 flex flex-col leading-[1.8]" key={i}>
              <NavLink
                to={navItem.path}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold px-4 py-2 text-[#146fe6]"
                    : "px-4 py-2"
                }
              >
                <FontAwesomeIcon icon={navItem.icon} className="mr-2" />
                {navItem.item}
              </NavLink>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default SideBar;
