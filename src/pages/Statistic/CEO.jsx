import { Box, Grid, Stack, Typography } from "@mui/material";
import Page from "../../components/Page";
import { BarChart } from "@mui/x-charts/BarChart";
import BarsDataset from "../../components/Chart/CEOchart";
import ToggleSwitch from "../../components/TripleToggleSwitch/TripleToggleSwitch";
import { useEffect, useState } from "react";
import { updateGraph } from "./ChartFunction";
import Select from "../../components/Filter/Select";

const StatisticCEO = () => {
  const [graph, setGraph] = useState([
    {
      data: Array.from({ length: 12 }, (_, i) => {
        return {
          x: 2011 + i,
          send: 0,
          receive: 0,
        };
      }),
    },
  ]);

  const [timeView, setTimeView] = useState("Năm");
  const [GDcenter, setGDcenter] = useState(["Tất cả"]);
  const [TKcenter, setTKcenter] = useState(["Tất cả"]);
  const [dateList, setDateList] = useState([]);
  for (let i = 0; i <= 2; i++)
    for (let j = 1; j <= 5; j++) {
      const GD = `GD${i}${j}`;
      const TK = `TK${i}${j}`;
      GDcenter.push(GD);
      TKcenter.push(TK);
    }

  useEffect(
    () => updateGraph(dateList, timeView, graph[0], setGraph),
    [dateList, timeView]
  );
  const switchTime = (mode) => setTimeView(mode);
  const selectGDcenter = (center) => setGDcenter(center);
  const selectTKcenter = (center) => setTKcenter(center);

  return (
    <Page>
      <Grid container justifyContent="center" spacing={0} height={1}>
        {/* c1 */}
        <Grid item lg={6} md={6} xs={12}>
          <Stack sx={{ height: "100%" }}>
            <Box
              sx={{
                width: "98%",
                height: {
                  xs: "10%",
                  sm: "6%",
                  md: "6%",
                  lg: "6%",
                },
                borderRadius: 2,
                // pb: "var(--padding-item)",
                mt: "10px",
                //ml: "30px",
                ml: "10px",
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
                p: "var(--padding-item)",
                mt: "10px",
                ml: "10px",
                mb: "10px",
                height: "90%",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    fontSize: {
                      xs: "15px",
                      sm: "20px",
                      md: "22px",
                      lg: "22px",
                    },
                    color: "var(--title-color)",
                    zIndex: 1,
                  }}
                >
                  Thống kê số lượng hàng gửi, hàng nhận toàn quốc
                </Typography>
              </Stack>
              <Box
                sx={{
                  bgcolor: "var(--secondary-color)",
                  borderRadius: 2,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  p: 1,
                  pt: 0,
                  mt: 2,
                  width: 1,
                  height: "90%",
                }}
              >
                <BarsDataset view={"all"} />
              </Box>
            </Box>
          </Stack>
        </Grid>
        {/* c2,3 */}
        <Grid item lg={6} md={6} xs={12}>
          <Stack sx={{ height: "100%" }}>
            {/* c2 */}
            <Box
              sx={{
                bgcolor: "var(--secondary-color)",
                borderRadius: 2,
                p: "var(--padding-item)" / 2,
                m: "10px",
                height: "50%",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={{
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
                  Thống kê theo điểm giao dịch
                </Typography>
                <Select options={GDcenter} onSelect={selectGDcenter} />
              </Stack>
              <Box
                sx={{
                  bgcolor: "var(--secondary-color)",
                  borderRadius: 2,
                  height: "50%",
                }}
              >
                <BarsDataset view={"none"}/>
              </Box>
            </Box>
            {/* c3 */}
            <Box
              sx={{
                bgcolor: "var(--secondary-color)",
                borderRadius: 2,
                p: "var(--padding-item)" / 2,
                ml: "10px",
                mb: "10px",
                mr: "10px",
                height: "50%",
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
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
                  Thống kê theo điểm tập kết
                </Typography>
                <Select options={TKcenter} onSelect={selectTKcenter} />
              </Stack>
              <Box
                sx={{
                  bgcolor: "var(--secondary-color)",
                  borderRadius: 2,
                  p: 1,
                  height: "50%",
                }}
              >
                <BarsDataset view={"none"}/>
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Page>
  );
};

export default StatisticCEO;
