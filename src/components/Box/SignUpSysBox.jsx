import { useState } from "react";

import { Typography, Stack, Box } from "@mui/material";
import SignUpForm from "../FormInput/SignUpSysForm";
import { getDataGDsys } from "../Table/GD_System";
import { getDataTksys } from "../Table/TK_System";

const SignUpSysBox = ({ data, centerroot, onClose }) => {
  const defaultForm = {
    id: "",
    name: "",
    manage: "",
    hotline: "",
    email: "",
    address: "",
    setDay: "",
    coverArea: "",
    TKpoint: "",
  };
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const submit = async () => {
      const { id, name, manage, hotline, address, setDay, coverArea, TKpoint } =
        form;

      if (centerroot === "gd") {
        if (!/^GD\d{2}$/.test(id)) {
          alert("ID không hợp lệ");
          return;
        }
      }

      if (centerroot === "tk") {
        if (!/^TK\d{2}$/.test(id)) {
          alert("ID không hợp lệ");
          return;
        }
      }

      if (centerroot === "gd") {
        const getGDsystem = getDataGDsys();
        if (getGDsystem.some((row) => row.id === id)) {
          alert("ID đã tồn tại");
          return;
        }
        if (
          getGDsystem.some((row) => row.name.toLowerCase() === name.toLowerCase())
        ) {
          alert("Điểm GD này đã tồn tại");
          return;
        }
      }

      if (centerroot === "tk") {
        const getTKsystem = getDataTksys();
        if (getTKsystem.some((row) => row.id === id)) {
          alert("ID đã tồn tại");
          return;
        }
        if (
          getTKsystem.some((row) => row.name.toLowerCase() === name.toLowerCase())
        ) {
          alert("Điểm TK này đã tồn tại");
          return;
        }
      }

      const email = `${id.toLowerCase()}@magic-post.com`;
      setForm({
        ...form,
        email,
      });

      if (centerroot === "gd") {
        if (
            !name ||
            !manage ||
            !hotline ||
            !address ||
            !setDay ||
            !coverArea ||
            !TKpoint
          ) {
            alert("Vui lòng điền đầy đủ các mục");
            return;
          }
      }
      if (centerroot === "tk") {
        if (
            !name ||
            !manage ||
            !hotline ||
            !address ||
            !setDay
          ) {
            alert("Vui lòng điền đầy đủ các mục");
            return;
          }
      }

      if (centerroot === "gd") {
        console.log(form);
        alert("Điểm giao dịch đã được thêm thành công");
      }
      if (centerroot === "tk") {
        console.log(form);
        alert("Điểm tập kết đã được thêm thành công");
      }
    };

    submit();
  };

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
          width: { xs: "75%", md: "50%" },
          height: "100%",
          backgroundColor: "white",
          transition: "transform 0.5s ease",
          transform: "translateX(0)",
          zIndex: "tooltip",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            height: { xs: "100%", md: "100%" },
            pb: "var(--padding-item)",
          }}
        >
          <Stack
            sx={{
              p: "var(--padding-item)",
              height: "100%",
              bgcolor: "#fff",
              borderRadius: "20px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Typography
              align="center"
              sx={{
                width: "100%",
                color: "var(--title-color)",
                fontFamily: "var(--font-raleway)",
                fontSize: "25px",
                fontWeight: "bold",
                textShadow: "0px 4px 10px rgba(86, 157, 170, 0.5)",
              }}
              mb={"var(--padding-item)"}
            >
              {centerroot === "gd"
                ? "Tạo mới điểm giao dịch"
                : "Tạo mới điểm tập kết"}
            </Typography>
            <SignUpForm
              data={data}
              center={centerroot}
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpSysBox;
