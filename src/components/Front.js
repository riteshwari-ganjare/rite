import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Grid, TextField, Autocomplete, Button, Chip, Divider } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { ArrowForward } from '@mui/icons-material';
import Image from "next/image";

const BRANCHES = ['Central Facility Building', 'Mihan Branch', 'Tech Park Canteen', 'Remote Site A'];

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};

const Front = ({ images, items, data, onBranchSelect, branchOptions }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
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
    const autoSlideTimer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000);
    return () => clearInterval(autoSlideTimer);
  }, [data.length]);

  const handleSelectionChange = useCallback((event, value) => {
    if (value && onBranchSelect) {
      onBranchSelect(value.name || value.title);
    }
  }, [onBranchSelect]);

  // Use the menu details for the currently selected branch passed from page.js
  const activeInfo = images && images.length > 0 ? images[0] : null;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", height: "80vh", backgroundSize: "cover", flexDirection: "column", backgroundImage: "url('/Home.png')", backgroundColor: "black" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#FF7E5F", borderBottom: "2px solid #FF7E5F", textTransform: "uppercase", fontSize: { xs: "30px", sm: "45px" } }}>
          We Provide
        </Typography>
        <Typography variant="body1" sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }, fontWeight: 600, color: "white", padding: "6px 12px", borderRadius: "8px", transform: isVisible ? "translateX(0)" : "translateX(-30px)", opacity: isVisible ? 1 : 0, transition: "all 0.5s ease-out" }}>
          {currentTitle}
        </Typography>
        <Box sx={{ marginTop: "16px", width: "80%", maxWidth: "600px", borderRadius: "8px" }}>
          <Autocomplete
            options={branchOptions}
            getOptionLabel={(option) => option.title}
            filterOptions={(opts, { inputValue }) =>
              opts.filter(o => o.title.toLowerCase().includes(inputValue.toLowerCase()))
            }
            renderOption={(props, option) => (
              <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon sx={{ color: '#FF7E5F', fontSize: 18 }} />
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{option.title}</Typography>
                  <Typography sx={{ fontSize: 11, color: '#888' }}>{option.address}</Typography>
                </Box>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search branch..."
                inputProps={{ ...params.inputProps, style: { color: "#000" } }}
                sx={{ backgroundColor: "white", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "#fff" }, "&:hover fieldset": { borderColor: "#FF7E5F" }, "&.Mui-focused fieldset": { borderColor: "#FF7E5F" } }, width: "100%" }}
                InputProps={{ ...params.InputProps, startAdornment: <LocationOnIcon sx={{ color: "#FF7E5F", mr: 1 }} /> }}
              />
            )}
            onChange={handleSelectionChange}
            sx={{ width: "100%" }}
          />
        </Box>

        {activeInfo && (
          <Box sx={{ width: { xs: '90%', sm: '80%' }, maxWidth: 700, mt: 2, p: 2.5, borderRadius: '12px', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,126,95,0.3)', backdropFilter: 'blur(8px)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <LocationOnIcon sx={{ color: '#FF7E5F' }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#FF7E5F' }}>{activeInfo.location}</Typography>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,126,95,0.2)', mb: 1.5 }} />
            <Grid container spacing={2} sx={{ mb: 1.5 }}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon sx={{ color: '#FF7E5F', fontSize: 16 }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>{activeInfo.day}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon sx={{ color: '#FF7E5F', fontSize: 16 }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>Opens at {activeInfo.time}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, padding: "10px", justifyContent: "center" }}>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold", letterSpacing: "1px", transition: "color 0.3s ease-in-out", "&:hover": { color: "#FF7E5F" } }}>Want to make your Business Online?</Typography>
          <Button sx={{ backgroundColor: "#FF645A", transform: "scale(1.05)", boxShadow: "0px 4px 14px rgba(255, 94, 74, 0.4)", color: "#fff", fontWeight: "600", textTransform: "none", borderRadius: "8px", transition: "transform 0.3s ease, box-shadow 0.3s ease", "&:hover": { backgroundColor: "#FF645A", transform: "scale(1.0)", boxShadow: "0px 4px 14px rgba(255, 94, 74, 0.4)", color: "#fff" }, "& .MuiButton-endIcon": { fontSize: "1.2rem" }}} endIcon={<ArrowForward />} size="small" onClick={() => setLc((prev) => !prev)}>Let's Connect</Button>
        </Box>
      </Box>
      {/* {lc && (
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
      )} */}
    </>
  );
};

export default Front;
