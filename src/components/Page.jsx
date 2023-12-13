import { Children, useContext } from "react";
import { Box } from "@mui/system";
import ResponsiveDrawer from "./Navbar/ResponsiveNavbar";
import { AuthContext } from "./Authentication/AuthProvider";
import Warning from "./Warning";

export default function Page({ children }) {
  const currentUser = useContext(AuthContext);
  return (
    <>
      {!currentUser ? (
        <Warning />
      ) : (
        <>
          <ResponsiveDrawer />
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
      )}
    </>
  );
}
