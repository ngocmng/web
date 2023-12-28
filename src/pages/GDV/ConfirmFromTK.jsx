import Page from "../../components/Page";

import { itemsGDV } from "../../components/Navbar/ItemInfor";

import TKConfirm from "../../components/Confirmation/TKConfirm";
import { Box, Container, Paper } from "@mui/material";

const ConfirmFromTK = () => {
  return (
    <Page items={itemsGDV}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <TKConfirm />
          </Paper>
        </Container>
      </Box>
    </Page>
  );
};

export default ConfirmFromTK;
