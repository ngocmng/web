import { Box, Grid, Stack, Typography } from "@mui/material";
import Page from "../../components/Page";
import BarsDataset from "../../components/Chart/CEOchart";
import ToggleSwitch from "../../components/TripleToggleSwitch/TripleToggleSwitch";
import { useEffect, useState } from "react";
import { updateGraph } from "./ChartFunction";
import StickyHeadTable from "../../components/Table/Test";

const StatisticGD = () => {
  const [graph, setGraph] = useState([
    {
      data: Array.from({ length: 6 }, (_, i) => {
        return {
          x: 2018 + i,
          send: 0,
          receive: 0,
        };
      }),
    },
  ]);

  const [timeView, setTimeView] = useState("Năm");
  const [dateList, setDateList] = useState([]);
  const [table, setTable] = useState([]);

  useEffect(
    () => updateGraph(dateList, timeView, graph[0], setGraph),
    [dateList, timeView]
  );
  const switchTime = (mode) => setTimeView(mode);

  return (
    <Page>
      <Box sx={{ flexGrow: 1, mt: "10px", mb: "10px", ml: "20px", mr: "20px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Stack
              sx={{
                flexGrow: 1,
                flexDirection: {
                  lg: "row",
                  md: "row",
                  xs: "column",
                },
              }}
            >
              <Box
                sx={{
                  width: {
                    lg: "60%",
                    md: "70",
                    xs: "100%",
                  },
                  height: 350,
                  bgcolor: "grey.300",
                  mr: "10px",
                  mb: "10px",
                }}
              >
                {/* biểu đồ nè */}
                <Box
                  sx={{
                    width: "93%",
                    height: {
                      xs: "10%",
                      sm: "10%",
                      md: "10%",
                      lg: "10%",
                    },
                    borderRadius: 2,
                    // pb: "var(--padding-item)",
                    mt: "10px",
                    //ml: "30px",
                    ml: "20px",
                    mr: "100px",
                  }}
                >
                  <ToggleSwitch
                    values={["Tháng", "Quý", "Năm"]}
                    selected={timeView}
                    onChange={switchTime}
                  />
                </Box>
                <Box
                  sx={{
                    bgcolor: "var(--secondary-color)",
                    borderRadius: 2,
                    // p: "var(--padding-item)",
                    ml: "20px",
                    mr: "20px",
                    mt: "10px",
                    mb: "10px",
                    height: "80%",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      sx={{
                        flexGrow: 1,
                        width: "100%",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        fontSize: {
                          xs: "15px",
                          sm: "20px",
                          md: "22px",
                          lg: "22px",
                        },
                        paddingLeft: "20px",
                        color: "var(--title-color)",
                        zIndex: 1,
                      }}
                    >
                      Thống kê số lượng hàng gửi, hàng nhận tại UET
                      {/* Cần sửa lại tên giao dịch tùy thuộc việc đăng nhập với tài khoản nào */}
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      bgcolor: "var(--secondary-color)",
                      borderRadius: 2,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      //   p: 1,
                      pt: 0,
                      //   mt: 2,
                      width: 1,
                      height: "50%",
                      pl: {
                        lg: "30px",
                      },
                    }}
                  >
                    <BarsDataset view={"gd"} />
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width: {
                    lg: "40%",
                    md: "30%",
                    xs: "100%",
                  },
                  height: 350,
                  bgcolor: "var(--secondary-color)",
                  ml: "10px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Cái gì gì đấy */}
                <img
                  src="cat.png"
                  alt="Cat"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                height: 250,
                bgcolor: "grey.300",
                p: "10px",
              }}
            >
              {/* Danh sách này */}
              <StickyHeadTable />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default StatisticGD;
