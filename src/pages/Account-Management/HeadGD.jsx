import { Box, Grid, Stack, Typography } from "@mui/material";
import Page from "../../components/Page";
import GDV_Account, { getDataGDVacc } from "../../components/Table/GDV_Account";
import { useState } from "react";
import SignUpForm from "../../components/FormInput/SignUpAccForm";
import SignUpGDVForm from "../../components/FormInput/SignUpGdvAccForm";

const HeadGDAccount = () => {
  const defaultForm = {
    id: "",
    username: "",
    name: "",
    center: "CN8",
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

        if (!/^\d{4}$/.test(id)) {
          alert("ID không hợp lệ");
          return;
        }

     
        const getGDVaccount = getDataGDVacc();
        if (getGDVaccount.some((row) => row.id === id)) {
          alert("ID đã tồn tại");
          return;
        }
        user = `GDV${id}`;

      const username = user;
      const email = `${username}@magic-post.com`;
      const password = `MP@${username}`;
      console.log(username);
      console.log(email);
      console.log(password);
      setForm({
        ...form,
        username,
        email,
        password,
      });
      

      if (!name || !phone || !dob || !sex) {
        alert("Vui lòng điền đầy đủ các mục");
        return;
      }

        alert("Tài khoản nhân viên tập kết đã được thêm thành công");
        console.log(form);
    };

    submit();
    
  };
  return (
    <Page>
      <Box
      sx={{
        height: { xs: "100%", md: "80%" },
        pb: "var(--padding-item)",
        pt: "var(--padding-item)",
        mt: "var(--padding-item)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          p: "var(--padding-item)",
          height: "100%",
          width: "95%",
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
            fontSize: "30px",
            fontWeight: "bold",
            textShadow: "0px 4px 10px rgba(86, 157, 170, 0.5)",
            pb: "var(--padding-item)", 
          }}
          mb={"var(--padding-item)"}
        >
          Tạo mới tài khoản giao dịch viên
        </Typography>
        <SignUpGDVForm
              center={"gdv"}
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
      </Stack>
    </Box>
    </Page>
  );
};

export default HeadGDAccount;
