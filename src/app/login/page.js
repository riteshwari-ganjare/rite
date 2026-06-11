"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Email, Lock, CheckCircle, Error as ErrorIcon } from "@mui/icons-material"; 

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
  });
  const [modal, setModal] = useState({ open: false, title: "", message: "", type: "success" });

  const router = useRouter(); 

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({ name: "", email: "", password: "", category: "" });
    setErrors({ name: "", email: "", password: "", category: "" });
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "User ID is required.";
    // Allow 'riteshwari' or a valid email format
    return email === "riteshwari" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Invalid format.";
  };

  const validatePassword = (password) =>
    password.length >= 6 ? "" : "Password must be at least 6 characters.";

  const validateName = (name) => (name.trim() ? "" : "Name is required.");

  const validateCategory = (category) =>
    category ? "" : "Business category is required.";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") setErrors({ ...errors, email: validateEmail(value) });
    if (name === "password")
      setErrors({ ...errors, password: validatePassword(value) });
    if (name === "name") setErrors({ ...errors, name: validateName(value) });
    if (name === "category")
      setErrors({ ...errors, category: validateCategory(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const nameError = isRegister ? validateName(formData.name) : "";
    const categoryError = isRegister ? validateCategory(formData.category) : "";

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      category: categoryError,
    });

    if (!emailError && !passwordError && !nameError && !categoryError) {
      try {
        const url = isRegister ? "/api/register" : "/api/login";
        const body = isRegister ? formData : { email: formData.email, password: formData.password };

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong.");
        }

        if (isRegister) {
          setModal({ open: true, title: "Registration Successful", message: data.message, type: "success" });
          toggleForm(); 
        } else {
          setModal({ open: true, title: "Welcome Back", message: data.message, type: "success" });
          localStorage.setItem("token", data.token);
          localStorage.setItem("userEmail", formData.email);
          router.push("/dashboard");
        }
      } catch (error) {
        setModal({ open: true, title: "Action Failed", message: error.message, type: "error" });
      }
    }
  };

  const isFormValid = () =>
    !errors.name &&
    !errors.email &&
    !errors.password &&
    !errors.category &&
    (isRegister ? formData.name && formData.category : true) &&
    formData.email &&
    formData.password;

  return (
    <Box
      sx={{
        minHeight: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: '"Roboto", sans-serif',
        padding: 2,
        background: "linear-gradient(135deg, #fff9f9, #FEB47B)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "32px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.35)",
          "&:hover": {
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.15)",
          },
          transition: "all 0.3s ease",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            marginBottom: "24px",
            textAlign: "center",
            color: "#333",
          }}
        >
          <Divider>{isRegister ? "Register" : "Login"}</Divider>
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
            label="User ID / Email"
            name="email"
            type="text"
            placeholder="Enter your email here"
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#FF7E5F" }} /> 
                </InputAdornment>
              ),
            }}
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
            placeholder="Enter your password here"
            variant="outlined"
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#FF7E5F" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              marginBottom: "16px",
              input: { color: "black" },
              label: { color: "black" },
            }}
          />

          {isRegister && (
            <FormControl fullWidth error={!!errors.category} sx={{ marginBottom: "16px" }}>
              <InputLabel>Business Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="Business Category"
              >
                <MenuItem value="fruits">Fruits Business</MenuItem>
                <MenuItem value="vegetables">Vegetables Business</MenuItem>
                <MenuItem value="laundry">Laundry Business</MenuItem>
                <MenuItem value="dairy">Dairy Products</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              <Typography variant="caption" sx={{ color: "red" }}>
                {errors.category}
              </Typography>
            </FormControl>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isFormValid()}
            sx={{
              marginBottom: "16px",
              background: "#FF7E5F",
              "&:hover": {
                backgroundColor: "#FF4A35",
              },
              padding: "14px",
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
              color: "#003366",
            },
          }}
          onClick={toggleForm}
        >
          {isRegister
            ? "Already have an account? Login here."
            : "Don't have an account? Register here."}
        </Typography>
      </Box>

      {/* Status Modal */}
      <Dialog 
        open={modal.open} 
        onClose={() => setModal({ ...modal, open: false })}
        PaperProps={{ sx: { borderRadius: '16px', p: 1, maxWidth: '380px', width: '100%' } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 800 }}>
          {modal.type === 'success' ? <CheckCircle sx={{ color: '#4caf50' }} /> : <ErrorIcon sx={{ color: '#f44336' }} />}
          {modal.title}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#666', fontWeight: 500 }}>{modal.message}</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setModal({ ...modal, open: false })}
            variant="contained"
            sx={{ borderRadius: '8px', bgcolor: modal.type === 'success' ? '#FF7E5F' : '#333', '&:hover': { bgcolor: '#FF4A35' } }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginPage;
