import { Box, Grid, Stack, Typography } from "@mui/material";
import Page from "../../components/Page";
import GDV_Account, { getDataGDVacc } from "../../components/Table/GDV_Account";
import { useState } from "react";
import SignUpForm from "../../components/FormInput/SignUpAccForm";
import SignUpGDVForm from "../../components/FormInput/SignUpGdvAccForm";
import { useLiveQuery } from "dexie-react-hooks";
import { addDataToFireStoreAndDexie, dexieDB } from "../../database/cache";

const HeadGDAccount = () => {
  const id = localStorage.getItem("id").slice(1);
  const data = useLiveQuery(() =>
    dexieDB
      .table("GDVacc")
      .filter((item) => item.id.startsWith(id))
      .toArray()
  );
  const defaultForm = {
    id: "",
    username: "",
    name: "",
    center: localStorage.getItem("center"),
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
      const { name, center, phone, dob, sex } = form;
      let lastID = "";
      data.forEach((item) => {
        const currentID = item.id;
        const currentNumber = parseInt(currentID.substring(2));
        lastID = `GD${(currentNumber + 1).toString().padStart(5, "0")}`;
      });
      const username = "staff" + lastID;
      const email = lastID + "@magic-post.com";
      const id = lastID;
      const password = "MG@" + username;
      if (!name || !phone || !dob || !sex) {
        alert("Vui lòng điền đầy đủ các mục");
        return;
      }
      setForm({
        ...form,
        id,
        username,
        email,
        password,
      });
      const form1 = {
        id: id,
        name: name,
        username: username,
        gd: center,
        dob: dob,
        sex: sex,
        email: email,
        phone: phone,
        password: password,
      };
      addDataToFireStoreAndDexie("GDVacc", form1);
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
            Tạo mới tài khoản giao dịch viên điểm{" "}
            {localStorage.getItem("center")}
          </Typography>
          <SignUpGDVForm
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
