import { AiOutlineHome } from "react-icons/ai";
import { GoGraph } from "react-icons/go";
import { FaUsersCog } from "react-icons/fa";
import { IoIosGlobe } from "react-icons/io";
import { VscGraph } from "react-icons/vsc";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CreateListIcon from "@mui/icons-material/PostAdd";
import CreateIcon from '@mui/icons-material/Create';
import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from "./NavItem.module.css";

const itemsCEO = [
  {
    path: "/home",
    icon: <AiOutlineHome className={styles["nav-icon"]} />,
    title: "Trang chủ",
  },
  {
    path: "/statistic",
    icon: <VscGraph className={styles["nav-icon"]} />,
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
    title: "Quản lý hệ thống",
  },
];

const itemsLeadGD = [
  {
    path: "/home",
    icon: <AiOutlineHome className={styles["nav-icon"]} />,
    title: "Trang chủ",
  },
  {
    path: "/statistic",
    icon: <VscGraph className={styles["nav-icon"]} />,
    title: "Thống kê",
  },
  {
    path: "/account",
    icon: <FaUsersCog className={styles["nav-icon"]} />,
    title: "Cấp tài khoản GDV",
  },
];

const itemsLeadTK = [
  {
    path: "/home",
    icon: <AiOutlineHome className={styles["nav-icon"]} />,
    title: "Trang chủ",
  },
  {
    path: "/statistic",
    icon: <VscGraph className={styles["nav-icon"]} />,
    title: "Thống kê",
  },
  {
    path: "/account",
    icon: <FaUsersCog className={styles["nav-icon"]} />,
    title: "Quản lý tài khoản",
  },
];

const itemsGDV = [
  {
    path: "/home",
    icon: <AiOutlineHome className={styles["nav-icon"]} />,
    title: "Trang chủ",
  },
  {
    path: "/regis",
    icon: <LocalPostOfficeIcon className={styles["nav-icon"]} />,
    title: "Ghi nhận hàng gửi",
  },
  {
    //path: "/TKpoint",
    icon: <DashboardIcon className={styles["nav-icon"]} />,
    title: "Điểm tập kết",
    children: [
      {
        path: "/TKpoint/createShipment",
        icon: <CreateListIcon className={styles["nav-icon"]} />,
        title: "Tạo đơn chuyển hàng",
      },
      {
        path: "/TKpoint/confirmShipment",
        icon: <ChecklistIcon className={styles["nav-icon"]} />,
        title: "Xác nhận hàng về",
      },
    ],
  },
  {
    //path: "/ship",
    icon: <LocalShippingIcon className={styles["nav-icon"]} />,
    title: "Giao hàng",
    children: [
      {
        path: "/ship/createShipment",
        icon: <CreateListIcon className={styles["nav-icon"]} />,
        title: "Tạo đơn giao hàng",
      },
      {
        path: "/ship/confirmStatus",
        icon: <ChecklistIcon className={styles["nav-icon"]} />,
        title: "Xác nhận trạng thái",
      },
      {
        path: "/ship/statistic",
        icon: <VscGraph className={styles["nav-icon"]} />,
        title: "Thống kê",
      },
    ],
  },
];

const itemsNVTK = [
  {
    path: "/home",
    icon: <AiOutlineHome className={styles["nav-icon"]} />,
    title: "Trang chủ",
  },
  {
    //path: "/createShipment",
    icon: <CreateIcon className={styles["nav-icon"]} />,
    title: "Tạo đơn hàng",
    children: [
      {
        path: "/createShipment/toGD",
        icon: <LocalShippingIcon className={styles["nav-icon"]} />,
        title: "Đến điểm giao dịch",
      },
      {
        path: "/createShipment/toTK",
        icon: <LocalShippingIcon className={styles["nav-icon"]} />,
        title: "Đến điểm tập kết",
      },
    ],
  },
  {
    //path: "/confirm",
    icon: <CheckCircleIcon className={styles["nav-icon"]} />,
    title: "Xác nhận",
    children: [
      {
        path: "/confirm/fromGD",
        icon: <ArticleIcon className={styles["nav-icon"]} />,
        title: "Từ điểm giao dịch",
      },
      {
        path: "/confirm/fromTK",
        icon: <ArticleIcon className={styles["nav-icon"]} />,
        title: "Từ điểm tập kết",
      },
    ],
  },
];

export { itemsCEO, itemsLeadGD, itemsLeadTK, itemsGDV, itemsNVTK };

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
