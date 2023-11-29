import { useState, useEffect } from "react";
import Switch, { switchClasses } from "@mui/joy/Switch";

export default function ExampleIosSwitch({ onSwitch }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    onSwitch(checked);
  }, [checked, onSwitch]);

  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      sx={(theme) => ({
        "--Switch-thumbShadow": "0 3px 7px 0 rgba(0, 0, 0, 0.16)",
        "--Switch-thumbSize": "20px",
        "--Switch-trackWidth": "40px",
        "--Switch-trackHeight": "25px",
        "--Switch-trackBackground": "var(--border-color)",
        [`& .${switchClasses.thumb}`]: {
          transition: "width 0.5s, left 0.5s",
        },
        "&:hover": {
          "--Switch-trackBackground": "var(--border-color)",
        },
        "&:active": {
          "--Switch-thumbWidth": "32px",
        },
        [`&.${switchClasses.checked}`]: {
          "--Switch-trackBackground": "var(--font1-color)",
          "&:hover": {
            "--Switch-trackBackground": "var(--font1-color)",
          },
        },
      })}
    />
  );
}
