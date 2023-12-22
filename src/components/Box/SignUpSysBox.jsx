import { useState } from "react";

import { Typography, Stack, Box } from "@mui/material";
import SignUpForm from "../FormInput/SignUpSysForm";
import { addDataToFireStoreAndDexie} from "../../database/cache";


const SignUpSysBox = ({ data, centerroot, onClose }) => {
  //console.log(data);
  const defaultForm = {
    id: "",
    name: "",
    manage: "",
    hotline: "",
    email: "",
    address: "",
    setDay: new Date(),
    coverArea: "",
    TKpoint: "",
  };
  const [form, setForm] = useState(defaultForm);
  const handleChange = (e) => 
    setForm({ ...form, [e.target.name]: e.target.value });
  

  const handleSubmit = () => {
    //console.log(data);
    const submit = async () => {
      const { name, manage, hotline, address, setDay, coverArea, TKpoint } =
        form;

      let lastID = "";
      data.forEach((item) => {
        const currentID = item.id;
        const currentNumber = parseInt(currentID.slice(2));
        //if (currentNumber > parseInt(lastID.slice(2))) {
        lastID =
          centerroot === "tk"
            ? `TK${(currentNumber + 1).toString()}`
            : `GD${(currentNumber + 1).toString()}`;
        //}
      });

      const matchingName = data.find((item) => item.name === name);
      if (centerroot === "gd") {
        if (matchingName) {
          alert("Điểm GD này đã tồn tại");
          return;
        }
      }

      if (centerroot === "tk") {
        if (matchingName) {
          alert("Điểm TK này đã tồn tại");
          return;
        }
      }

      const realID = lastID;
      console.log(realID);
      const form2 = {
        ...form, 
        id: realID,
        email: `${realID.toLowerCase()}@magic-post.com`, 
      };

      setForm({
        ...form,
        id : realID,
        email: `${realID.toLowerCase()}@magic-post.com`,
      });
      //console.log(form2);

      if (centerroot === "gd") {
        if (
          !name ||
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
        if (!name || !hotline || !address || !setDay) {
          alert("Vui lòng điền đầy đủ các mục");
          return;
        }
      }

      if (centerroot === "gd") {
        addDataToFireStoreAndDexie("GDsystem", form2);
      }
      if (centerroot === "tk") {
        addDataToFireStoreAndDexie("TKsystem", form2);
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
          width: { xs: "75%", md: "75%" },
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
            height: { xs: "100%", md: "70%" },
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
