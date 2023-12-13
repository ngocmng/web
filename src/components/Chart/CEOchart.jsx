// import React, { useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Container, Typography } from '@mui/material';
// import { Chart } from 'chart.js';

// const CEOchart = ({data}) => {
// const chartData = {
//   labels: data[0].data.map(item => item.x.toString()),
//   datasets: [
//     {
//       label: 'Hàng gửi',
//       data: data[0].data.map(item => item.send), // Sử dụng giá trị "hangNhan" cho "Hàng Nhận"
//       backgroundColor: data[0].color,
//       borderColor: 'rgba(75, 192, 192, 1)',
//       borderWidth: 1,
//     },
//     {
//       label: 'Hàng nhận',
//       data: data[0].data.map(item => item.receive), // Sử dụng giá trị "hangGui" cho "Hàng Gửi"
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       borderColor: 'rgba(255, 99, 132, 1)',
//       borderWidth: 1,
//     },
//   ],
// };

// useEffect(() => {
//   // Create the chart after component mounts
//   const ctx = document.getElementById('barChart');
//   new Chart(ctx, {
//     type: 'bar',
//     data: chartData,
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });
// }, []);

// return (
//   <Container>
//     <Typography variant="h5">Biểu Đồ Cột</Typography>
//     <Bar id="barChart" data={chartData} />
//   </Container>
// );
// };
// export default CEOchart;

// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { BarChart } from '@mui/x-charts/BarChart';

// const data = {
//   labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
//   datasets: [
//     {
//       label: 'Hàng Nhận',
//       data: [10, 15, 8, 12, 14],
//       backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       borderColor: 'rgba(75, 192, 192, 1)',
//       borderWidth: 1,
//     },
//     {
//       label: 'Hàng Gửi',
//       data: [5, 8, 12, 9, 11],
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       borderColor: 'rgba(255, 99, 132, 1)',
//       borderWidth: 1,
//     },
//   ],
// };

// const CEOchart = () => {
//   return (
//     <div>
//       <BarChart dataset={data}/>
//     </div>
//   );
// };

// export default CEOchart;

import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

// const valueFormatter = (value) => `${value}mm`;

export default function BarsDataset({ view }) {
  const chartSetting = {
    width: view === "gd" ? 550 : 550,
    height: view === "all" ? 490 : 255,
  };

  const generateDataset = (startYear, endYear) => {
    const dataset = [];

    for (let year = startYear; year <= endYear; year++) {
      const send = Math.floor(Math.random() * 50) + 5;
      const receive = Math.floor(Math.random() * 50) + 10;

      dataset.push({
        send,
        receive,
        time: year.toString(),
      });
    }

    return dataset;
  };

  const startYear = 2018;
  const endYear = 2023;
  const dataset = generateDataset(startYear, endYear);

  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "time" }]}
      series={[
        { dataKey: "send", label: "Hàng gửi", color: "var(--bar1-color)" },
        { dataKey: "receive", label: "Hàng nhận", color: "var(--bar2-color)" },
      ]}
      {...chartSetting}
    />
  );
}
