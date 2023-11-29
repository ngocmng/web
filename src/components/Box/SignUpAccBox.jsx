import { useState } from "react";

import { Typography, Stack, Box } from "@mui/material";
import SignUpForm from "../FormInput/SignUpAccForm";
import { getDataGDacc} from "../Table/GD_Account";
import { getDataTKacc } from "../Table/TK_Account";

const SignUpAccBox = ({ centerroot, onClose }) => {
  const defaultForm = {
    id: "",
    username: "",
    name: "",
    center: "",
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
      let username = String("");

      if (!/^\d{2}$/.test(id)) {
        alert("ID không hợp lệ");
        return;
      }

      if (centerroot === "gd") {
        const getGDaccount = getDataGDacc();
        if (getGDaccount.some((row) => row.id === id)) {
          alert("ID đã tồn tại");
          return;
        }
        if (
          getGDaccount.some((row) => row.gd.toLowerCase() === center.toLowerCase())
        ) {
          alert("Tài khoản trưởng điểm GD này đã tồn tại");
          return;
        }
        username = `LeadGD${id}`;
      }

      if (centerroot === "tk") {
        const getTKaccount = getDataTKacc();
        if (getTKaccount.some((row) => row.id === id)) {
          alert("ID đã tồn tại");
          return;
        }
        if (
          getTKaccount.some((row) => row.tk.toLowerCase() === center.toLowerCase())
        ) {
          alert("Tài khoản trưởng điểm TK này đã tồn tại");
          return;
        }
        username = `LeadTK${id}`;
      }

      const email = `${username}@magic-post.com`;
      const password = `magicPost@${username}`;
      setForm({
        ...form,
        username,
        email,
        password,
      });

      if (!name || !phone || !center || !dob || !sex) {
        alert("Vui lòng điền đầy đủ các mục");
        return;
      }

      if (centerroot === "gd") {
        console.log(form);
        alert("Tài khoản trưởng giao dịch đã được thêm thành công");
      }
      if (centerroot === "tk") {
        console.log(form);
        alert("Tài khoản trưởng tập kết đã được thêm thành công");
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
              {centerroot === "gd"? "Tạo mới tài khoản trưởng điểm giao dịch": "Tạo mới tài khoản trưởng điểm tập kết"}
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
