import React, { Fragment, useState } from "react";
import {
  CssBaseline,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import ThirdPanel from "../components/MainPage/ThirdPanel";
import SecondPanel from "../components/MainPage/SecondPanel";
import Header from "../components/MainPage/Header";
import Footer from "../components/MainPage/Footer";
import FirstPanel from "../components/MainPage/FirstPanel/FirstPanel";

function MainPage({tranfer}) {
  const [open, setOpen] = useState(false);
  const [orderCode, setOrderCode] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/order-status");
    // Xử lý logic tìm kiếm ở đây
    // <Link to="/orderStatus" />;
  };

  //const onSignIn = () => navigate("/home");

  return (
    <Fragment>
      <CssBaseline />
      <Header
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onSignIn={tranfer}
      />
      <FirstPanel
        onOrderCodeChange={(e) => setOrderCode(e.target.value)}
        onSearchClick={handleSearch}
      />
      <SecondPanel />
      <ThirdPanel />
      <Footer />
    </Fragment>
  );
}

export default MainPage;


