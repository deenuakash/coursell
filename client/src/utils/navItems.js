import {
  faDownload,
  faGear,
  faGraduationCap,
  faHouse,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const navItems1 = [
  {
    item: "Home",
    icon: faHouse,
    path: "/",
  },
  {
    item: "Courses",
    icon: faGraduationCap,
    path: "/new-courses",
  },
];

const navItems2 = [
  {
    item: "Purchases",
    icon: faDownload,
    path: "/purchases",
  },
  {
    item: "Settings",
    icon: faGear,
    path: "/settings",
  },
  {
    item: "Logout",
    icon: faRightFromBracket,
    path: "/logout",
  },
];

export { navItems1, navItems2 };
