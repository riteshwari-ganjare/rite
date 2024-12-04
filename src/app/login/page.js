"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, TextField, Button } from "@mui/material";

// Temporary storage for registered users
const users = [];

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const router = useRouter(); // Initialize useRouter

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({ name: "", email: "", password: "" });
    setErrors({ name: "", email: "", password: "" });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Invalid email format.";

  const validatePassword = (password) =>
    password.length >= 6 ? "" : "Password must be at least 6 characters.";

  const validateName = (name) => (name.trim() ? "" : "Name is required.");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate on change
    if (name === "email") setErrors({ ...errors, email: validateEmail(value) });
    if (name === "password") setErrors({ ...errors, password: validatePassword(value) });
    if (name === "name") setErrors({ ...errors, name: validateName(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const nameError = isRegister ? validateName(formData.name) : "";

    setErrors({ name: nameError, email: emailError, password: passwordError });

    if (!emailError && !passwordError && !nameError) {
      if (isRegister) {
        // Check if the user already exists
        if (users.find((user) => user.email === formData.email)) {
          alert("User already registered. Please login.");
        } else {
          users.push({ name: formData.name, email: formData.email, password: formData.password });
          alert("Registered successfully!");
          toggleForm(); // Switch to login after successful registration
        }
      } else {
        // Login validation
        const user = users.find(
          (user) => user.email === formData.email && user.password === formData.password
        );
        if (user) {
          alert(`Welcome back, ${user.name}!`);
          router.push("/dashboard"); // Navigate to /dashboard
        } else {
          alert("Invalid credentials or user not registered. Please register first.");
        }
      }
      setFormData({ name: "", email: "", password: "" });
    }
  };

  const isFormValid = () =>
    !errors.name && !errors.email && !errors.password &&
    (isRegister ? formData.name : true) &&
    formData.email &&
    formData.password;

  return (
    <Box
      sx={{
        backgroundColor: "white",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        fontFamily: '"Roboto", sans-serif',
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
          transition: "all 0.3s ease",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            marginBottom: "24px",
            textAlign: "center",
            transition: "color 0.3s ease",
          }}
        >
          {isRegister ? "Register" : "Login"}
        </Typography>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                marginBottom: "16px",
                input: { color: "black" },
                label: { color: "black" },
              }}
            />
          )}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              marginBottom: "16px",
              input: { color: "black" },
              label: { color: "black" },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            sx={{
              marginBottom: "24px",
              input: { color: "black" },
              label: { color: "black" },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isFormValid()}
            sx={{
              marginBottom: "16px",
              transition: "background-color 0.3s ease, transform 0.3s ease",
              "&:hover": {
                backgroundColor: "#0066cc",
                transform: "translateY(-2px)",
              },
              background:"#FF7E5F"
            }}
          >
            {isRegister ? "Register" : "Login"}
          </Button>
        </form>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            cursor: "pointer",
            textDecoration: "underline",
            color: "#0066cc",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "primary.main",
            },
          }}
          onClick={toggleForm}
        >
          {isRegister
            ? "Already have an account? Login here."
            : "Don't have an account? Register here."}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
