import { Box, Grid, Stack, Typography } from "@mui/material";
import Page from "../../components/Page";
import Switch from "../../components/Switch";
import { useState } from "react";
import GD_Account from "../../components/Table/GD_Account";
import TK_Account from "../../components/Table/TK_Account";
import { useLiveQuery } from "dexie-react-hooks";
import { dexieDB } from "../../database/cache";

const Account = () => {
  const dataGD = useLiveQuery(() => dexieDB.table("LeadGDacc").toArray());  
  const dataTK = useLiveQuery(() => dexieDB.table("LeadTKacc").toArray());
  const GDsys = useLiveQuery(() => dexieDB.table("GDsystem").toArray());  
  const TKsys = useLiveQuery(() => dexieDB.table("TKsystem").toArray());
  const [stateView, setStateView] = useState("GD");
  const switchState = (state) => setStateView(state ? "TK" : "GD");
  const toggleTable = () => {
    return stateView === "GD" ? (
      <GD_Account data={dataGD} system = {GDsys}/>
    ) : (
      <TK_Account data={dataTK} system = {TKsys}/>
    );
  };
  return (
    <Page>
      <Grid container justifyContent="center" spacing={0} height={1}>
        <Grid
          item
          justifyContent="center"
          height={{
            xs: "80%",
            sm: "80%",
            md: "90%",
            lg: "100%",
          }}
          lg={12}
          md={12}
          xs={12}
        >
          <Stack
            spacing={{ xs: 0, sm: 0 }}
            sx={{ p: "var(--padding-item)", height: "100%" }}
          >
            <Box
              sx={{
                //bgcolor: "var(--secondary-color)",
                borderRadius: 2,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                p: "var(--padding-item)",
                pt: 1,
                mb: 0,
                width: 1,
                height: "10%",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  // bgcolor: "var(--background-color)",
                  padding: "10px"
                }}
                
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    fontSize: {
                      xs: "18px",
                      sm: "25px",
                      md: "25px",
                      lg: "25px",
                    },
                    color: "var(--title-color)",
                    zIndex: 1,
                  }}
                >
                    Quản lý tài khoản điểm{" "}
                    {stateView === "GD" ? "giao dịch" : "tập kết"}
                </Typography>
                <Switch onSwitch={switchState} />
              </Stack>
            </Box>
            {toggleTable()}
          </Stack>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Account;
