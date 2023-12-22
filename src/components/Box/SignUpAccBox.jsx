import { useState } from "react";

import { Typography, Stack, Box } from "@mui/material";
import SignUpForm from "../FormInput/SignUpAccForm";
import {
  addDataToFireStoreAndDexie,
  registerUser,
  updateDataFromFireStoreAndDexie,
} from "../../database/cache";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "../../database/firebase";

const SignUpAccBox = ({ data, system, centerroot, onClose }) => {
  const defaultForm = {
    id: "",
    username: "",
    name: "",
    center: centerroot === "nvtk" ? data[0].tk : "",
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

      if (centerroot === "gd" || centerroot === "tk") {
        const System = system.find((item) => item.name === center);
        if (System) {
          const username = "Lead" + System.id;
          const email = System.email;
          const id = "L" + System.id;
          const password = "L" + System.id.toLowerCase() + "@magic-post";
          if (!name || !phone || !dob || !sex || !center) {
            alert("Vui lòng điền đầy đủ các mục");
            return;
          }
          setForm({
            ...form,
            id : id,
            username : username,
            email: email,
            password:password,
          });
          if (centerroot === "gd") {
            const form1 = {
              id: System.id,
              name: System.name,
              manage: name,
              hotline: System.hotline,
              email: System.email,
              address: System.address,
              setDay: System.setDay,
              coverArea: System.coverArea,
              TKpoint: System.TKpoint,
            };
            const form2 = {
              id: id,
              username: username,
              email: email,
              password: password,
              name: name,
              gd: center,
              phone: phone,
              dob: dob,
              sex: sex,
            };
            addDataToFireStoreAndDexie("LeadGDacc", form2);
            //registerUser(form2.email, form2.password);
            updateDataFromFireStoreAndDexie("GDsystem", System.id, form1);
            //createUserWithEmailAndPassword(fireAuth, form2.email, form2.password)
          } else {
            const form1 = {
              id: System.id,
              name: System.name,
              manage: name,
              hotline: System.hotline,
              email: System.email,
              address: System.address,
              setDay: System.setDay,
            };
            const form2 = {
              id: id,
              username: username,
              email: email,
              password: password,
              name: name,
              tk: center,
              phone: phone,
              dob: dob,
              sex: sex,
            };
            addDataToFireStoreAndDexie("LeadTKacc", form2);
            updateDataFromFireStoreAndDexie("TKsystem", System.id, form1);
          }
        }
      } else if (centerroot === "nvtk") {
        let lastID = "";
        data.forEach((item) => {
          const currentID = item.id;
          const currentNumber = parseInt(currentID.substring(2));
          lastID = `TK${(currentNumber + 1).toString().padStart(5, "0")}`;
        });
        const username = "staff" + lastID;
        const email = lastID.substring(0, 4) + "000@magic-post.com";
        const id = lastID;
        const password = "MG@" + username.substring(0, 9);
        if (!name || !phone || !dob || !sex) {
          alert("Vui lòng điền đầy đủ các mục");
          return;
        }
        setForm({
          ...form,
          id : id,
          username : username,
          email: email,
          password:password,
        });
          const form1 = {
            id: id,
            name: name,
            username: username,
            tk: center,
            dob: dob,
            sex: sex,
            email: email,
            phone: phone,
            password: password,
          }
          addDataToFireStoreAndDexie("NVTKacc", form1);
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
              system={system}
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
