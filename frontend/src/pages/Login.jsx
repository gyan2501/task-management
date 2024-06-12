import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    debugger;
    setEmailError(!validateEmail(email));
    setPasswordError(password === "");

    if (!emailError && !passwordError && email && password) {
      try {
        const res = await axios.post("https://taskmanagement-backend-q6uw.onrender.com/api/users/login", {
          email,
          password,
        });

        if (res.status === 200) {
          toast.success(res.data.message);
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("createdBy", JSON.stringify(res.data.user));
           navigate("/dashboard")
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        if (error.response.status === 401) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
      setEmail("")
      setPassword("")
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError && "Please enter a valid email address"}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError && "Password is required"}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </form>
        <Box mt={2}>
          New to this App? <Link to="/">Sign up here</Link>
        </Box>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
};

export default Login;
