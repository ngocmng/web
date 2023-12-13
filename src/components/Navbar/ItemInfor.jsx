import { AiOutlineHome } from "react-icons/ai";
import { GoGraph } from "react-icons/go";
import { FaUsersCog } from "react-icons/fa";
import { IoIosGlobe } from "react-icons/io";
import styles from "./NavItem.module.css";


const items = [
  {
    path: "/home",
    icon: <AiOutlineHome className={styles["nav-icon"]} />,
    title: "Trang chủ",
  },
  {
    path: "/statistic",
    icon: <GoGraph className={styles["nav-icon"]} />,
    title: "Thống kê",
  },
  {
    path: "/account",
    icon: <FaUsersCog className={styles["nav-icon"]} />,
    title: "Quản lý tài khoản",
  },
  {
    path: "/system",
    icon: <IoIosGlobe className={styles["nav-icon"]} />,
    title: "Quản lý hệ thống (CEO)",
  },
];

export default items;


// import { AiOutlineHome } from "react-icons/ai";
// import { GoGraph } from "react-icons/go";
// import { FaUsersCog } from "react-icons/fa";
// import { IoIosGlobe } from "react-icons/io";
// import styles from "./NavItem.module.css";

// const id = localStorage.getItem("id");

// let items = [
//   {
//     path: "/home",
//     icon: <AiOutlineHome className={styles["nav-icon"]} />,
//     title: "Trang chủ",
//   },
//   {
//     path: "/statistic",
//     icon: <GoGraph className={styles["nav-icon"]} />,
//     title: "Thống kê",
//   },
//   {
//     path: "/account",
//     icon: <FaUsersCog className={styles["nav-icon"]} />,
//     title: "Quản lý tài khoản",
//   }
// ];

// if (id === "CEO") {
//   items.push({
//     path: "/system",
//     icon: <IoIosGlobe className={styles["nav-icon"]} />,
//     title: "Quản lý hệ thống",
//   });
// }

// export default items;
