
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

// const valueFormatter = (value) => `${value}mm`;

export default function BarsDataset({ data, view }) {
  //console.log(data);
  const chartSetting = {
    // width: view === "gd" ? 550 : 550,
    height: view === "all" ? 490 : 255,
    width: 550,
    //height: 255,
  };

  return (
    <BarChart
      dataset={data[0].data}
      xAxis={[{ scaleType: "band", dataKey: "x" }]}
      series={[
        { dataKey: "sent", label: "Hàng gửi", color: "var(--bar1-color)" },
        { dataKey: "receive", label: "Hàng nhận", color: "var(--bar2-color)" },
      ]}
      {...chartSetting}
    />
  );
}
