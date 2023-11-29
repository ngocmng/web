import { Children } from "react";
import { Box } from "@mui/system";
import ResponsiveDrawer from "./Navbar/ResponsiveNavbar";

export default function Page({ children }) {
  return (
    <>
      <ResponsiveDrawer sx={{
          backgroundColor: "var(--navbar-color)",
        }}/>
      <Box
        sx={{
          marginTop: { xs: "45px", sm: "45px", md: "0px" },
          position: "relative",
          width: "100vw",
          height: "auto",
          backgroundColor: "var(--primary-color)",
          overflow: "auto",
        }}
      >
        {Children.map(children, (child) => (
          <>{child}</>
        ))}
      </Box>
    </>
  );
}
