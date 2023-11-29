import { Box } from "@mui/material";
import styles from "./FormInput.module.css";

const FormInput = ({ label, icon, color, ...otherProps }) => {
  return (
    <Box height={0.19} className={styles["input-group"]}>
          <input
            className={`${styles["form-input"]} ${
              color === "other" ? styles["other-color"] : ""
            }`}
            {...otherProps}
          />
          {icon}
          {label && (
            <label
              className={`${otherProps.value.length ? styles["shrink"] : ""} ${
                styles["form-input-label"]
              } ${color === "other" ? styles["other-color"] : ""}
          `}
            >
              {label}
            </label>
          )}
    </Box>
  );
};

export default FormInput;
