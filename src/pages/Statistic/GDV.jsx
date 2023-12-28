import { Box, Grid, Stack, Typography } from "@mui/material";
import Page from "../../components/Page";
import BarsDataset from "../../components/Chart/Barchart";
import ToggleSwitch from "../../components/TripleToggleSwitch/TripleToggleSwitch";
import { useEffect, useRef, useState } from "react";
import { updateGraph } from "./ChartFunction";
import { dexieDB } from "../../database/cache";
import { useLiveQuery } from "dexie-react-hooks";
import { itemsGDV, itemsLeadGD } from "../../components/Navbar/ItemInfor";
import Switch from "../../components/Switch";
import DetailOrdersTable from "../../components/Table/DetailOrders";
import AppP from "../../components/Print";
import Buttonme from "../../components/Buttonme/Buttonme";


const StatisticGDV = () => {
  const orders = useLiveQuery(() =>
    dexieDB
      .table("orderHistory")
      .where("currentLocation")
      .equals(localStorage.getItem("id").slice(-4))
      .toArray()
  );

  const orderDetail = useLiveQuery(() => dexieDB.table("orders").toArray());
 

  const [stateView, setStateView] = useState("sent");
  const [IDstateView, setIDStateView] = useState("Đã giao thành công cho người nhận");

  const combinedArray =
  orders && orderDetail
  ? orders
      .filter(
        (order) =>
          order.historyID.slice(-1) === "4" && //Trên này thay bằng 5
          //order.orderStatus === IDstateView
          order.orderStatus === "Đã giao"
      )
      .map((order) => {
        const correspondingOrderDetail = orderDetail.find(
          (detail) => detail.id === order.orderID
        );     

          if (correspondingOrderDetail) {
            return {
              id: correspondingOrderDetail.id,
              date: order.date,
              orderStatus: order.orderStatus,
              senderName: correspondingOrderDetail.senderName,
              senderPhone: correspondingOrderDetail.senderPhone,
              senderAddress: correspondingOrderDetail.senderAddress,
              receiverName: correspondingOrderDetail.receiverName,
              receiverPhone: correspondingOrderDetail.receiverPhone,
              receiverAddress: correspondingOrderDetail.receiverAddress,
            };
          }

          return null // hoặc có thể trả về một giá trị mặc định nếu không tìm thấy correspondingOrderDetail
        })
      : "";

  //console.log(orders);
  const [graph, setGraph] = useState([
    {
      data: Array.from({ length: 6 }, (_, i) => {
        return {
          id: "statistic",
          x: 2018 + i,
          sent: 0,
          receive: 0,
        };
      }),
    },
  ]);
  //console.log(graph);

  const [timeView, setTimeView] = useState("Năm");
  const [sentDateList, setSentDateList] = useState([]);
  const [receiveDateList, setReceiveDateList] = useState([]);
  
  const switchState = (state) => {
    setStateView(state ? "received" : "sent");
    setIDStateView(state ? "Đã giao không thành công cho người nhận" : "Đã giao thành công cho người nhận");
  }
  //console.log(stateView);

  useEffect(() => {
    if (!orders) return;
    setSentDateList(
      orders
        .filter((order) => order.historyID.slice(-1) === "4") //Cần sửa lại bằng "5" và so sánh điều kiện orderStatus
        .map((order) => order["date"])
    );
    setReceiveDateList(
      orders
        .filter((order) => order.historyID.slice(-1) === "5")  //Cần sửa lại bằng "5" và so sánh điều kiện orderStatus
        .map((order) => order["date"])
    );
  }, [orders]);

  // console.log(sentDateList);
  useEffect(
    () =>
      updateGraph(sentDateList, receiveDateList, timeView, graph[0], setGraph),
    [sentDateList, receiveDateList, timeView]
  );
  const switchTime = (mode) => setTimeView(mode);


  // Test print
  // const [view, setView] = useState("Create");
  // const handleClick = () => {
  //   setView("Print");
  // };

  // const handleBack = () => {
  //   setView("Create")
  // };

  // const defaultForm = {
  //   id: "DH1002",
  //   senderName: "Trần Thị A",
  //   senderPhone: "0868809172",
  //   senderAddress: "144 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
  //   receiverName: "Trần Thị B",
  //   receiverPhone: "0986457893",
  //   receiverAddress: "136 Phú Mỹ, Mỹ Đình 2, Nam Từ Liêm, Hà Nội",
  //   type: "Tài liệu",
  //   weight: "15",
  //   cost: "100000",
  //   startGDpoint: "Cầu Giấy",
  //   startTKpoint: "Hà Nội",
  //   endTKpoint: "Hà Nội",
  //   endGDpoint: "Nam Từ Liêm",
  // }

  return (
    <Page items={itemsGDV}>
      <Grid container justifyContent="center" spacing={0} height={1}>
  
            <Grid item lg={6} md={6} xs={12}>
              <Stack sx={{ height: "100%" }}>
                <Box
                  sx={{
                    bgcolor: "var(--secondary-color)",
                    borderRadius: 2,
                    p: "var(--padding-item)" / 2,
                    m: "10px",
                    height: "100%",
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
                      Danh sách đơn hàng{" "}
                      {stateView === "sent"
                        ? "đã giao thành công"
                        : "giao không thành công"}
                    </Typography>
                    <Switch onSwitch={switchState} />
                  </Stack>
                  <Box
                    sx={{
                      width: "100%",
                      height: "95%",
                      bgcolor: "grey.100",
                      p: "10px",
                    }}
                  >
                    <DetailOrdersTable data={combinedArray} />
                  </Box>
                </Box>
              </Stack>
            </Grid>

            {/* Biểu đồ này */}
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
                    pr: "var(--padding-item)",
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
                    m: "10px",
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
                      Thống kê trạng thái đơn hàng tại{" "}
                      {localStorage.getItem("center")}
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      bgcolor: "var(--secondary-color)",
                      borderRadius: 2,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      //p: 1,
                      pr: "var(--padding-item)",
                      pt: 0,
                      mt: 2,
                      width: 1,
                      height: "90%",
                    }}
                  >
                    <BarsDataset
                      data={graph}
                      view={"all"}
                      label1={"Đã giao"}
                      label2={"Giao không thành công"}
                    />
                  </Box>
                </Box>
              </Stack>
            </Grid>

      </Grid>
    </Page>
  );
};

export default StatisticGDV;

// import { Box, Grid, Stack, Typography } from "@mui/material";
// import Page from "../../components/Page";
// import BarsDataset from "../../components/Chart/Barchart";
// import ToggleSwitch from "../../components/TripleToggleSwitch/TripleToggleSwitch";
// import { useEffect, useRef, useState } from "react";
// import { updateGraph } from "./ChartFunction";
// import { dexieDB } from "../../database/cache";
// import { useLiveQuery } from "dexie-react-hooks";
// import { itemsGDV, itemsLeadGD } from "../../components/Navbar/ItemInfor";
// import Switch from "../../components/Switch";
// import DetailOrdersTable from "../../components/Table/DetailOrders";
// import ReceiptPaper from "../../components/ReceiptPaper";
// import AppP from "../../components/Print";

// const StatisticGDV = () => {

//   return (
//     <Page items={itemsGDV}>
//       <Grid container justifyContent="center" spacing={0} height={0.7}>
//         <AppP/>
//       </Grid>
//     </Page>
//   );
// };

// export default StatisticGDV;
