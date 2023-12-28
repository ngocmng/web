const review = [
    {
      path: "/regis",
      describe:
        "Ghi nhận hàng cần gửi của khách, in giấy biên nhận",
      title: "Ghi nhận hàng gửi",
    },
    {
      path: "/TKpoint/createShipment",
      describe:
        "Tạo đơn chuyển hàng đến điểm tập kết",
      title: "Tạo đơn chuyển hàng",
    },
    {
      path: "/TKpoint/confirmShipment",
      describe:
        "Xác nhận đơn hàng về từ điểm tập kết",
      title: "Xác nhận hàng về",
    },
    {
        path: "/ship/createShipment",
        describe:
          "Tạo đơn hàng chuyển đến tay người nhận",
        title: "Tạo đơn giao hàng",
      },
      {
        path: "/ship/confirmStatus",
        describe:
          "Xác nhận trạng thái của đơn hàng",
        title: "Xác nhận trạng thái",
      },
      {
        path: "/ship/statistic",
        describe:
          "Thống kê trạng thái đơn hàng",
        title: "Thống kê",
      },
  ];
  export default review;