import ReportIcon from "@mui/icons-material/Report";
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate } from "react-router-dom";

import { Stack, Typography, Button } from "@mui/material";

export default function Warning() {
  const navigate = useNavigate();

  return (
    <Stack
      direction={"column"}
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: "#d62e29",
          fontSize: "2em",
          fontFamily: "var(--font-raleway)",
          fontWeight: "bold",
        }}
      >
        CẢNH BÁO
      </Typography>
      <ReportIcon
        sx={{
          fontSize: 200,
          color: "#F0FF00",
        }}
      />
      <Stack direction={"row"} spacing={2}>
        <WarningIcon
          sx={{
            color: "#d62e29",
          }}
        />
        <Typography
          sx={{
            color: "#d62e29",
            fontSize: "1em",
            fontFamily: "var(--font-inter)",
          }}
        >
          Bạn cần phải đăng nhập nếu muốn tiếp tục truy cập
        </Typography>
        <WarningIcon
          sx={{
            color: "#d62e29",
          }}
        />
      </Stack>
      <Button
        sx={{
          py: "var(--padding-item)",
          height: 50,
          mt: 2,
          backgroundColor: "#f45743",
          fontSize: "0.8em",
          borderRadius: 5,
          color: "white",
          fontWeight: "bold",
          fontFamily: "prompt",
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "#f45743",
            fontSize: "1em",
          },
        }}
        onClick={() => navigate("/")}
      >
        Đăng nhập
      </Button>
    </Stack>
  );
}