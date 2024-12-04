import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Grid, TextField, Autocomplete } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const Front = ({ images, items }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [highlightTime, setHighlightTime] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let index = 0;
    const titleTimer = setInterval(() => {
      if (index < items.length) {
        setCurrentTitle(`${items[index].title} ${items[index].description}`);
        index++;
      } else {
        clearInterval(titleTimer);
      }
    }, 2000);
    return () => clearInterval(titleTimer);
  }, [items]);

  useEffect(() => {
    const highlightTimer = setInterval(() => {
      setHighlightTime((prev) => !prev);
    }, 3000);
    return () => clearInterval(highlightTimer);
  }, []);

  const handleSelectionChange = useCallback((event, value) => {
    setSelectedItem(value);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        height: "80vh",
        backgroundSize: "cover",
        flexDirection: "column",
        backgroundImage: "url('/Home.png')",
        backgroundColor: "black",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "#FF7E5F",
          borderBottom: "2px solid #FF7E5F",
          textTransform: "uppercase",
          fontSize: { xs: "30px", sm: "45px" },
        }}
      >
        We Provide
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1rem", sm: "1.2rem" },
          fontWeight: 600,
          color: "white",
          padding: "6px 12px",
          borderRadius: "8px",
          transform: isVisible ? "translateX(0)" : "translateX(-30px)",
          opacity: isVisible ? 1 : 0,
          transition: "all 0.5s ease-out",
        }}
      >
        {currentTitle}
      </Typography>

      <Box sx={{ marginTop: "16px", width: "80%", maxWidth: "600px", borderRadius: "8px" }}>
        <Autocomplete
          options={images}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search By Place"
              aria-label="Search by Title"
              inputProps={{
                ...params.inputProps,
                style: { color: "#000" },
              }}
              sx={{
                backgroundColor: "white",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: "#fff",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FF7E5F",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7E5F",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000",
                },
                width: "100%",
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: <LocationOnIcon sx={{ color: "#FF7E5F" }} />,
              }}
            />
          )}
          onChange={handleSelectionChange}
          sx={{ width: "100%" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          marginTop: "20px",
        }}
      >
        {selectedItem && (
          <Box
            sx={{
              padding: "16px",
              color: "white",
              borderRadius: "8px",
              width: { xs: "100%", sm: "80%" },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ flex: 1, marginBottom: { xs: "20px", sm: "0" } }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  color: "#FF7E5F",
                }}
              >
                {selectedItem.title}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "white",
                    }}
                  >
                    <CalendarTodayIcon sx={{ color: "#FF7E5F" }} />
                    Date: {selectedItem.day}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "white",
                    }}
                  >
                    <AccessTimeIcon sx={{ color: "#FF7E5F" }} />
                    Time: {selectedItem.time}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ flex: 1, marginBottom: { xs: "20px", sm: "0" } }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  color: "#FF7E5F",
                }}
              >
                Don't Miss the Timing
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "white",
                  backgroundColor: highlightTime ? "#FF5733" : "transparent",
                  padding: "8px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                  transform: "scale(1)",
                  transition: "transform 0.3s ease, background-color 0.3s ease",
                  animation: highlightTime ? "pulse 2s infinite ease-in-out" : "none",
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "#FF5733",
                  },
                  width: "50%",
                }}
              >
                <AccessTimeIcon sx={{ color: "white" }} />
                Time: {selectedItem.time}
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  color: "#FF7E5F",
                }}
              >
                Location
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "white",
                }}
              >
                <LocationOnIcon sx={{ color: "#FF7E5F" }} />
                Location: {selectedItem.location}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Front;
