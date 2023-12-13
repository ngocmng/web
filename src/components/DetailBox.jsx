// DetailBox.jsx
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getDataGDsys } from "./Table/GD_System";
import "./DetailBox.css";
import TK_GD_table from "./Table/TK_GD_System";

const DetailBox = ({ GD, row, isOpen, onClose }) => {
  const [getGD, setGetGD] = useState([]);
 // console.log(GD);
  useEffect(() => {
    if (GD && row && row.id) {
      const matchingGD = GD.filter((gd) => gd.TKpoint === row.name);
      setGetGD(matchingGD);
    }
  }, [GD, row.id]);
  //console.log(getGD);
  if (!isOpen || !row) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "modal",
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "75%",
          height: "100%",
          backgroundColor: "white",
          transition: "transform 0.5s ease",
          transform: "translateX(0)",
          zIndex: "tooltip",
          //overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box className="detailBox" p={3}>
          <strong>
            {row.id} - {row.name}
          </strong>
          <hr />
          <li>
            <strong>Trưởng điểm tập kết:</strong> {row.manage}
          </li>
          <li>
            <strong>Hotline:</strong> {row.hotline}
          </li>
          <li>
            <strong>Email:</strong> {row.email}
          </li>
          <li>
            <strong>Địa chỉ:</strong> {row.address}
          </li>
          <li>
            <strong>Ngày thành lập:</strong> {row.setDay}{" "}
          </li>
          <hr />

          <strong>Có {getGD.length} điểm giao dịch liên kết</strong>
          {getGD.length > 0 && <TK_GD_table rows={getGD} />}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailBox;
