import { useState } from "react";

import { Typography, Stack, Box } from "@mui/material";
import SignUpForm from "../FormInput/SignUpAccForm";
import { getDataGDacc } from "../Table/GD_Account";
import { getDataTKacc } from "../Table/TK_Account";
import { getDataNVTKacc, getTKpoint } from "../Table/NVTK_Account";

const SignUpAccBox = ({ data, centerroot, onClose }) => {
  const defaultForm = {
    id: "",
    username: "",
    name: "",
    center: centerroot === "nvtk" ? getTKpoint() : "",
    dob: "",
    sex: "",
    email: "",
    phone: "",
    password: "",
  };
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const submit = async () => {
      const { id, name, center, phone, dob, sex } = form;
      let user = String("");

      if (centerroot === "gd" || centerroot === "tk") {
        if (!/^\d{2}$/.test(id)) {
          alert("ID không hợp lệ");
          return;
        }
      } else {
        if (!/^\d{4}$/.test(id)) {
          alert("ID không hợp lệ");
          return;
        }
      }

      if (centerroot === "gd") {
        const getGDaccount = getDataGDacc();
        if (getGDaccount.some((row) => row.id === id)) {
          alert("ID đã tồn tại");
          return;
        }
        if (
          getGDaccount.some(
            (row) => row.gd.toLowerCase() === center.toLowerCase()
          )
        ) {
          alert("Tài khoản trưởng điểm GD này đã tồn tại");
          return;
        }
        user = `LeadGD${id}`;
      }

      if (centerroot === "tk") {
        const getTKaccount = getDataTKacc();
        if (getTKaccount.some((row) => row.id === id)) {
          alert("ID đã tồn tại");
          return;
        }
        if (
          getTKaccount.some(
            (row) => row.tk.toLowerCase() === center.toLowerCase()
          )
        ) {
          alert("Tài khoản trưởng điểm TK này đã tồn tại");
          return;
        }
        user = `LeadTK${id}`;
      }
      if (centerroot === "nvtk") {
        const getNVTKaccount = getDataNVTKacc();
        if (getNVTKaccount.some((row) => row.id === id)) {
          alert("ID đã tồn tại");
          return;
        }
        user = `NVTK${id}`;
      }

      const username = user;
      const email = `${username}@magic-post.com`;
      const password = `MP@${username}`;
      setForm({
        ...form,
        username,
        email,
        password,
      });
      console.log(username);
      console.log(email);
      console.log(password);

      if (!name || !phone || !dob || !sex) {
        alert("Vui lòng điền đầy đủ các mục");
        return;
      }
      if ((centerroot === "gd" || centerroot === "tk") && !center) {
        alert("Vui lòng điền đầy đủ các mục");
        return;
      }

      if (centerroot === "gd") {
        alert("Tài khoản trưởng giao dịch đã được thêm thành công");
        console.log(form);
      }
      if (centerroot === "tk") {
        alert("Tài khoản trưởng tập kết đã được thêm thành công");
        console.log(form);
      }
      if (centerroot === "nvtk") {
        alert("Tài khoản nhân viên tập kết đã được thêm thành công");
        console.log(form);
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
          //overflow: "auto",
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
                //pt: "var(--padding-item)",
                width: "100%",
                color: "var(--title-color)",
                fontFamily: "var(--font-raleway)",
                fontSize: "25px",
                fontWeight: "bold",
                textShadow: "0px 4px 10px rgba(86, 157, 170, 0.5)",
              }}
              mb={"var(--padding-item)"}
            >
              {(() => {
                switch (centerroot) {
                  case "gd":
                    return "Tạo mới tài khoản trưởng điểm giao dịch";
                  case "tk":
                    return "Tạo mới tài khoản trưởng điểm tập kết";
                  case "nvtk":
                    return "Tạo mới tài khoản nhân viên điểm tập kết";
                  default:
                    return "Tạo mới tài khoản giao dịch viên";
                }
              })()}
            </Typography>
            <SignUpForm
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

export default SignUpAccBox;
