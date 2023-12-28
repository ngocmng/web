import React, { Fragment, useState } from "react";
import { CssBaseline } from "@mui/material";

import ThirdPanel from "../components/MainPage/ThirdPanel";
import SecondPanel from "../components/MainPage/SecondPanel";
import Header from "../components/MainPage/Header";
import Footer from "../components/MainPage/Footer";
import FirstPanel from "../components/MainPage/FirstPanel/FirstPanel";

function MainPage({ tranfer }) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <CssBaseline />
      <Header
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onSignIn={tranfer}
      />
      <FirstPanel />
      <SecondPanel />
      <ThirdPanel />
      <Footer />
    </Fragment>
  );
}

export default MainPage;
