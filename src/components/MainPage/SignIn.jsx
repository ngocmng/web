import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { fireAuth } from "../../database/firebase";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdPermIdentity } from "react-icons/md";

const SignIn = ({ open, onClose, transfer }) => {
  useEffect(() => {
    signOut(fireAuth);
  }, []);
  const [input, setInput] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState({ state: false, message: "" });
  const [pwError, setPwError] = useState({ state: false, message: "" });
  const handleInput = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });
  const handleSignIn = () => {
    setEmailError({ state: false, message: "" });
    setPwError({ state: false, message: "" });

    if (!input.email.length) {
      setEmailError({ state: true, message: "Vui lòng nhập email" });
      return;
    }

    if (!input.password.length) {
      setPwError({ state: true, message: "Vui lòng nhập mật khẩu" });
      return;
    }

    const signIn = async ({ email, password }) => {
      try {
        await signInWithEmailAndPassword(fireAuth, email, password);
        transfer();
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            setEmailError({ state: true, message: "Email không tồn tại" });
            break;
          case "auth/wrong-password":
            setPwError({ state: true, message: "Mật khẩu không đúng" });
            break;
          default:
            alert(`${error.code}\n${error.message}`);
        }
      }
    };
    signIn(input);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{ fontWeight: 'bold', color: 'green', fontSize: 20 }}>Đăng nhập</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}
      >
        <TextField
          required
          name="email"
          label="Email"
          InputLabelProps={{
            style: { color: 'green' }, 
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ zIndex: 10 }}>
                <MdPermIdentity size={24} color="var(--title-color)" />
              </InputAdornment>
            ),
          }}
          sx = {{
            width: '90%',
            mt: 2,
          }}
          onChange={handleInput}
          error={emailError.state}
          helperText={emailError.message}
        />
        <TextField
          type="password"
          name="password"
          label="Mật khẩu"
          InputLabelProps={{
            style: { color: 'green' }, 
          }}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ zIndex: 10 }}>
                <RiLockPasswordFill size={24} color="var(--title-color)" />
              </InputAdornment>
            ),
          }}
          onChange={handleInput}
          error={pwError.state}
          helperText={pwError.message}
          sx={{ width: '90%', mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#003e29" }}>
          Hủy
        </Button>
        <Button onClick={handleSignIn} sx={{ color: "#003e29" }}>
          Đăng nhập
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignIn;
