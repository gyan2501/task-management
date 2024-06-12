import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async () => {
    debugger;
    setNameError(name === "");
    setEmailError(!validateEmail(email));
    setPasswordError(password === "");

    const userDetails = {
      name,
      email,
      password,
    };

    if (
      !nameError &&
      !emailError &&
      !passwordError &&
      name &&
      email &&
      password
    ) {
      try {
        const res = await axios.post(
          "https://taskmanagement-backend-q6uw.onrender.com/api/users/register",
          userDetails
        );
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/login");
        }
      } catch (error) {
        if (error.response.status === 403) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
      setEmail("");
      setName("");
      setPassword("");
    }
  };
  return (
    <>
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <form>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              helperText={nameError && "Name is required"}
            />
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
                onClick={handleRegister}
              >
                Register
              </Button>
            </Box>
          </form>
          <Box mt={2}>
            Already registered? <Link to="/login">Login here</Link>
          </Box>
        </Box>
      </Container>
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
    </>
  );
};

export default Signup;
