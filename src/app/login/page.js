// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, Divider, InputAdornment } from "@mui/material";
// import { Email, Lock } from "@mui/icons-material"; // Import icons

// // Temporary storage for registered users
// const users = [];

// const LoginPage = () => {
//   const [isRegister, setIsRegister] = useState(false);
//   const [formData, setFormData] = useState({ name: "", email: "", password: "", category: "" });
//   const [errors, setErrors] = useState({ name: "", email: "", password: "", category: "" });

//   const router = useRouter(); // Initialize useRouter

//   const toggleForm = () => {
//     setIsRegister(!isRegister);
//     setFormData({ name: "", email: "", password: "", category: "" });
//     setErrors({ name: "", email: "", password: "", category: "" });
//   };

//   const validateEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Invalid email format.";

//   const validatePassword = (password) =>
//     password.length >= 6 ? "" : "Password must be at least 6 characters.";

//   const validateName = (name) => (name.trim() ? "" : "Name is required.");

//   const validateCategory = (category) => (category ? "" : "Business category is required.");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Validate on change
//     if (name === "email") setErrors({ ...errors, email: validateEmail(value) });
//     if (name === "password") setErrors({ ...errors, password: validatePassword(value) });
//     if (name === "name") setErrors({ ...errors, name: validateName(value) });
//     if (name === "category") setErrors({ ...errors, category: validateCategory(value) });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const emailError = validateEmail(formData.email);
//     const passwordError = validatePassword(formData.password);
//     const nameError = isRegister ? validateName(formData.name) : "";
//     const categoryError = isRegister ? validateCategory(formData.category) : "";

//     setErrors({ name: nameError, email: emailError, password: passwordError, category: categoryError });

//     if (!emailError && !passwordError && !nameError && !categoryError) {
//       if (isRegister) {
//         // Check if the user already exists
//         if (users.find((user) => user.email === formData.email)) {
//           alert("User already registered. Please login.");
//         } else {
//           users.push({ name: formData.name, email: formData.email, password: formData.password, category: formData.category });
//           alert("Registered successfully!");
//           toggleForm(); // Switch to login after successful registration
//         }
//       } else {
//         // Login validation
//         const user = users.find(
//           (user) => user.email === formData.email && user.password === formData.password
//         );
//         if (user) {
//           alert(`Welcome back, ${user.name}!`);
//           router.push("/dashboard"); // Navigate to /dashboard
//         } else {
//           alert("Invalid credentials or user not registered. Please register first.");
//         }
//       }
//       setFormData({ name: "", email: "", password: "", category: "" });
//     }
//   };

//   const isFormValid = () =>
//     !errors.name && !errors.email && !errors.password && !errors.category &&
//     (isRegister ? formData.name && formData.category : true) &&
//     formData.email &&
//     formData.password;

//   return (
//     <Box
//       sx={{
//         // backgroundColor: "#000",
//         minHeight: "85vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         fontFamily: '"Roboto", sans-serif',
//         padding: 2,
//         transition: "background-color 0.5s ease", 
//         background: "linear-gradient(135deg, #fff9f9, #FEB47B)"

//       }}
//     >
//       <Box
//         sx={{
//           backgroundColor: "#fff",
//           padding: "32px",
//           width: "100%",
//           maxWidth: "400px",
//           boxShadow: "0 2px 6px rgba(0, 0, 0, 0.35)",  
//           "&:hover": {
//             boxShadow: "0 12px 36px rgba(0, 0, 0, 0.15)",  
//           },
//           transition: "all 0.3s ease",
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 700,
//             marginBottom: "24px",
//             textAlign: "center",
//             color: "#333",
//           }}
//         >
//           <Divider>{isRegister ? "Register" : "Login"}</Divider>
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           {isRegister && (
//             <TextField
//               fullWidth
//               label="Name"
//               name="name"
//               variant="outlined"
//               value={formData.name}
//               onChange={handleInputChange}
//               error={!!errors.name}
//               helperText={errors.name}
//               sx={{
//                 marginBottom: "16px",
//                 input: { color: "black" },
//                 label: { color: "black" },
//               }}
//             />
//           )}

//           <TextField
//             fullWidth
//             label="Email"
//             name="email"
//             type="email"
//             placeholder="Enter your email here"
//             variant="outlined"
//             value={formData.email}
//             onChange={handleInputChange}
//             error={!!errors.email}
//             helperText={errors.email}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Email sx={{ color: "#FF7E5F" }} /> {/* Add Email icon */}
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               marginBottom: "16px",
//               input: { color: "black" },
//               label: { color: "black" },
//             }}
//           />

//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type="password"
//             placeholder="Enter your password here"
//             variant="outlined"
//             value={formData.password}
//             onChange={handleInputChange}
//             error={!!errors.password}
//             helperText={errors.password}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Lock sx={{ color: "#FF7E5F" }} /> {/* Add Lock icon */}
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               marginBottom: "16px",
//               input: { color: "black" },
//               label: { color: "black" },
//             }}
//           />

//           {isRegister && (
//             <FormControl fullWidth error={!!errors.category} sx={{ marginBottom: "16px" }}>
//               <InputLabel>Business Category</InputLabel>
//               <Select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleInputChange}
//                 label="Business Category"
//               >
//                 <MenuItem value="fruits">Fruits Business</MenuItem>
//                 <MenuItem value="vegetables">Vegetables Business</MenuItem>
//                 <MenuItem value="laundry">Laundry Business</MenuItem>
//                 <MenuItem value="dairy">Dairy Products</MenuItem>
//                 <MenuItem value="other">Other</MenuItem>
//               </Select>
//               <Typography variant="caption" sx={{ color: "red" }}>
//                 {errors.category}
//               </Typography>
//             </FormControl>
//           )}

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={!isFormValid()}
//             sx={{
//               marginBottom: "16px",
//               background: "#FF7E5F",
//               "&:hover": {
//                 backgroundColor: "#FF4A35",
//               },
//               transition: "background-color 0.3s ease, transform 0.3s ease",
//               padding: "14px",
//             }}
//           >
//             {isRegister ? "Register" : "Login"}
//           </Button>
//         </form>

//         <Typography
//           variant="body2"
//           sx={{
//             textAlign: "center",
//             cursor: "pointer",
//             textDecoration: "underline",
//             color: "#0066cc",
//             transition: "color 0.3s ease",
//             "&:hover": {
//               color: "#003366",
//             },
//           }}
//           onClick={toggleForm}
//         >
//           {isRegister
//             ? "Already have an account? Login here."
//             : "Don't have an account? Register here."}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default LoginPage;
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; 
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
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material"; 

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

  const router = useRouter(); 

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({ name: "", email: "", password: "", category: "" });
    setErrors({ name: "", email: "", password: "", category: "" });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Invalid email format.";

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
        if (isRegister) {
          const response = await axios.post(
            "http://localhost:5000/api/users/register",
            formData
          );
          alert(response.data.message);
          toggleForm(); 
        } else {
          const response = await axios.post(
            "http://localhost:5000/api/users/login", 
            {
              email: formData.email,
              password: formData.password,
            }
          );
          alert(response.data.message);
          localStorage.setItem("token", response.data.token);
          router.push("/dashboard");
        }
      } catch (error) {
        alert(error.response?.data?.message || "Something went wrong.");
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
            label="Email"
            name="email"
            type="email"
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
    </Box>
  );
};

export default LoginPage;
