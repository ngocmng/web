import {
  Stack,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  Autocomplete,
  TextField,
} from "@mui/material";
import {
  Lock,
  Phone,
  BusinessCenter,
  Email,
  Grid3x3,
  AssignmentInd,
  Badge,
  Cake,
  Business,
} from "@mui/icons-material";

import FormInput from "./FormInput";
import Buttonme from "../Buttonme/Buttonme";
import styles from "./FormInput.module.css";

export default function SignUpForm({ data, center, form, onChange, onSubmit }) {
  const uniqueTKpoints = [...new Set(data.map((entry) => entry.TKpoint))];
  return (
    <Grid container sx={{ height: "90%" }}>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          height: { xs: "80%", md: "100%" },
        }}
      >
        <Stack
          sx={{
            backgroundColor: "#f5f8ff",
            p: "var(--padding-item)",
            py: 0,
            borderRadius: "20px",
            height: { xs: "100%", md: "80%" },
          }}
        >
          <FormInput
            label="ID*"
            type="text"
            onChange={onChange}
            name="id"
            value={form.id}
            icon=<Grid3x3 />
          />
          <FormInput
            label="Tên*"
            type="text"
            onChange={onChange}
            name="name"
            value={form.name}
            icon=<BusinessCenter />
          />
          <FormInput
            label={center === "gd" ? " Trưởng điểm GD*" : "Trưởng điểm TK*"}
            type="text"
            onChange={onChange}
            name="manage"
            value={form.manage}
            icon=<Badge />
          />
          <FormInput
            label="Hotline*"
            type="text"
            onChange={onChange}
            name="hotline"
            value={form.hotline}
            icon=<Phone />
          />
      {/* <Grid
        item
        xs={12}
        md={6}
        sx={{
          pl: "calc(var(--padding-item)/2)",
          height: { xs: "60%", md: "100%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            backgroundColor: "#f5f8ff",
            p: "var(--padding-item)",
            py: 0,
            borderRadius: "20px",
            height: "100%",
            mb: { xs: 0, md: "var(--padding-item)" },
          }}
        > */}
          <FormInput
            label="Ngày thành lập*"
            type="date"
            onChange={onChange}
            name="setDay"
            value={form.setDay}
            // icon=<Cake />
          />
          <FormInput
            label="Địa chỉ*"
            type="text"
            onChange={onChange}
            name="address"
            value={form.address}
            icon=<Business />
          />
          {center === "gd" && (
            <>
              <FormInput
                label="Vùng phụ trách*"
                type="text"
                onChange={onChange}
                name="coverArea"
                value={form.coverArea}
                icon=<Business />
              />
              <Autocomplete
                name="TKpoint"
                value={form.TKpoint}
                onInputChange={(event, newInputValue) => {
                  onChange({
                    target: { name: "TKpoint", value: newInputValue },
                  });
                }}
                options={uniqueTKpoints}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Điểm tập kết"
                    margin="normal"
                    variant="outlined"
                  />
                )}
                freeSolo
              />
            </>
          )}
        </Stack>
        <Stack sx={{
           mb: "var(--padding-item)",
        }}></Stack>
      </Grid>
      <Buttonme content="Tạo mới" onClick={onSubmit} />
    </Grid>
  );
}
