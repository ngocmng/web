import { Box, Grid, Stack, Typography } from "@mui/material";
import Page from "../../components/Page";
import GD_Table from "../../components/Table/GD_System";
import TK_Table from "../../components/Table/TK_System";
import Switch from "../../components/Switch";
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { dexieDB, fetchData } from "../../database/cache";

const System = () => {
    const dataGD = useLiveQuery(() => dexieDB.table("GDsystem").toArray());  
  const dataTK = useLiveQuery(() => dexieDB.table("TKsystem").toArray());
  
  const [stateView, setStateView] = useState("GD");
  const switchState = (state) => setStateView(state ? "TK" : "GD");
  const toggleTable = () => {
    return stateView === "GD" ? (
      <GD_Table data={dataGD} tkData={dataTK}/>
    ) : (
      <TK_Table data={dataTK} gdData={dataGD} />
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
                  padding: "10px",
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
                  Hệ thống các điểm{" "}
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

export default System;
