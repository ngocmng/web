import {
  Stack,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
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
} from "@mui/icons-material";

import FormInput from "./FormInput";
import Buttonme from "../Buttonme/Buttonme";
import { getTKpoint } from "../Table/NVTK_Account";

export default function SignUpForm({ center, form, onChange, onSubmit }) {
  return (
    <>
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
              label="Họ và Tên*"
              type="text"
              onChange={onChange}
              name="name"
              value={form.name}
              icon=<Badge />
            />
            <RadioGroup
              aria-labelledby="gender-radio-buttons-group-label"
              name="sex"
              value={form.sex}
              onChange={onChange}
              row
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Nam"
                style={{ color: "black" }}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Nữ"
                style={{ color: "black" }}
              />
            </RadioGroup>
            <FormInput
              label="Ngày sinh*"
              type="date"
              onChange={onChange}
              name="dob"
              value={form.dob}
              icon=<Cake />
            />
            <FormInput
              label="Số điện thoại*"
              type="text"
              onChange={onChange}
              name="phone"
              value={form.phone}
              icon=<Phone />
            />
            {(center === "gd" || center === "tk") && (
              <FormInput
                label={center === "gd" ? "Điểm giao dịch*" : "Điểm tập kết*"}
                type="text"
                onChange={onChange}
                name="center"
                value={form.center}
                icon=<BusinessCenter />
              />
            )}
            {(center === "nvtk") && (
              <FormInput
              label="Điểm tập kết"
              type="text"
              readOnly
              name="center"
              value={form.center}
              icon=<BusinessCenter />
              color="other"
            />
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
            // mt: "5%",
            mt: "-20%",
          }}
        >
          <Buttonme content="Tạo mới" onClick={onSubmit} />
        </Grid>
      </Grid>
    </>
  );
}
