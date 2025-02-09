import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Grid, TextField, Autocomplete, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { ArrowForward } from '@mui/icons-material';
import Image from "next/image";
import Head from "next/head"; // Importing Head for SEO purposes

const Front = ({ images, items, data }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [highlightTime, setHighlightTime] = useState(false);
  const [lc, setLc] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let index = 0;
    const titleTimer = setInterval(() => {
      if (index < items.length) {
        setCurrentTitle(`${items[index].title}- ${items[index].description}`);
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

  useEffect(() => {
    const autoSlideTimer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000);
    return () => clearInterval(autoSlideTimer);
  }, [data.length]);

  const handleSelectionChange = useCallback((event, value) => {
    setSelectedItem(value);
  }, []);

  return (
    <>
      <Head>
        <title>Your Business | Home</title> {/* Added SEO title */}
        <meta name="description" content="We provide services to help businesses grow online. Contact us today!" /> {/* SEO description */}
        <meta name="keywords" content="business, online services, digital marketing" /> {/* SEO keywords */}
        <meta name="robots" content="index, follow" /> {/* SEO robot instruction */}
        <link rel="icon" href="/favicon.ico" /> {/* Favicon */}
      </Head>

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", height: "80vh", backgroundSize: "cover", flexDirection: "column", backgroundImage: "url('/Home.png')", backgroundColor: "black" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#FF7E5F", borderBottom: "2px solid #FF7E5F", textTransform: "uppercase", fontSize: { xs: "30px", sm: "45px" } }}>
          We Provide
        </Typography>
        <Typography variant="body1" sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }, fontWeight: 600, color: "white", padding: "6px 12px", borderRadius: "8px", transform: isVisible ? "translateX(0)" : "translateX(-30px)", opacity: isVisible ? 1 : 0, transition: "all 0.5s ease-out" }}>
          {currentTitle}
        </Typography>
        <Box sx={{ marginTop: "16px", width: "80%", maxWidth: "600px", borderRadius: "8px" }}>
          <Autocomplete options={images} getOptionLabel={(option) => option.title} renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="Search By Place" aria-label="Search by Title" inputProps={{ ...params.inputProps, style: { color: "#000" } }} sx={{ backgroundColor: "white", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "#fff" }, "&:hover fieldset": { borderColor: "#FF7E5F" }, "&.Mui-focused fieldset": { borderColor: "#FF7E5F" } }, "& .MuiInputLabel-root": { color: "#000" }, width: "100%" }} InputProps={{ ...params.InputProps, startAdornment: <LocationOnIcon sx={{ color: "#FF7E5F" }} /> }} />
          )} onChange={handleSelectionChange} sx={{ width: "100%" }} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: "20px" }}>
          {selectedItem && (
            <Box sx={{ padding: "16px", color: "white", borderRadius: "8px", width: { xs: "100%", sm: "80%" }, display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between" }}>
              <Box sx={{ flex: 1, marginBottom: { xs: "20px", sm: "0" } }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px", color: "#FF7E5F" }}>{selectedItem.title}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: "8px", color: "white" }}>
                      <CalendarTodayIcon sx={{ color: "#FF7E5F" }} /> Date: {selectedItem.day}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: "8px", color: "white" }}>
                      <AccessTimeIcon sx={{ color: "#FF7E5F" }} /> Time: {selectedItem.time}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px", color: "#FF7E5F" }}>Location</Typography>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: "8px", color: "white" }}>
                  <LocationOnIcon sx={{ color: "#FF7E5F" }} /> Location: {selectedItem.location}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, padding: "10px", justifyContent: "center" }}>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold", letterSpacing: "1px", transition: "color 0.3s ease-in-out", "&:hover": { color: "#FF7E5F" } }}>Want to make your Business Online?</Typography>
          <Button sx={{ backgroundColor: "#FF645A", transform: "scale(1.05)", boxShadow: "0px 4px 14px rgba(255, 94, 74, 0.4)", color: "#fff", fontWeight: "600", textTransform: "none", borderRadius: "8px", transition: "transform 0.3s ease, box-shadow 0.3s ease", "&:hover": { backgroundColor: "#FF645A", transform: "scale(1.0)", boxShadow: "0px 4px 14px rgba(255, 94, 74, 0.4)", color: "#fff" }, "& .MuiButton-endIcon": { fontSize: "1.2rem" }}} endIcon={<ArrowForward />} size="small" onClick={() => setLc((prev) => !prev)}>Let's Connect</Button>
        </Box>
      </Box>
      {lc && (
        <>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", margin: "20px", fontWeight: "bold" }}>
            {data[currentIndex]?.des}
          </Box>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ width: "80%", maxWidth: "800px", display: "flex", justifyContent: "center" }}>
              <Image src={data[currentIndex]?.url || "/placeholder.jpg"} alt={`Carousel Image ${currentIndex}`} width={800} height={400} layout="intrinsic" />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Front;
