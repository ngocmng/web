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


export default function SignUpForm({
  data,
  center,
  form,
  onChange,
  onSubmit,
}) {
  const uniqueTKpoints = [...new Set(data.map((entry) => entry.TKpoint))];
  return (
    <>
      <Grid container sx={{ height: "90%" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: { xs: "60%", md: "100%" },
            pr: "calc(var(--padding-item)/2)",
          }}
        >
          <Stack
            sx={{
              backgroundColor: "#f5f8ff",
              //backgroundColor: "red",
              p: "var(--padding-item)",
              py: 0,
              borderRadius: "20px",
              height: "100%",
            }}
          >
            <FormInput
              label="ID*"
              type="text"
              onChange={onChange}
              name="id"
              value={form.id}
              readOnly
              icon=<Grid3x3 />
              color = "other"
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
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            pl: "calc(var(--padding-item)/2)",
            height: { xs: "60%", md: "100%" },
            //height: "100%",
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
          >
            <FormInput
              label="Ngày thành lập*"
              type="date"
              onChange={onChange}
              name="setDay"
              value={form.setDay}
              //readOnly
              icon=<Cake />
              //color = "other"
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
                    if (uniqueTKpoints.includes(newInputValue)) {
                      onChange({
                        target: { name: "TKpoint", value: newInputValue },
                      });
                    }
                  }}
                  options={uniqueTKpoints}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Điểm tập kết"
                      margin="normal"
                      variant="outlined"
                      sx={{
                        height: "5%",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            border: "1.5px solid var(--border-color)",
                          },
                        },
                      }}
                    />
                  )}
                  freeSolo
                />
              </>
            )}
          </Stack>
          {/* <Buttonme content="Tạo mới" onClick={onSubmit} /> */}
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "5%",
          }}
        >
          <Buttonme content="Tạo mới" onClick={onSubmit} />
        </Grid>
      </Grid>
    </>
  );
}
