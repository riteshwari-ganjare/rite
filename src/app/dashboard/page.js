"use client";
import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fade,
  Divider,
} from "@mui/material";
import Chip from '@mui/material/Chip';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import './dashboard.css';

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    location: "",
    time: "",
    day: "",
    vegetables: {
      Tomato: { available: false, price: "", marketprice: "" },
      Potato: { available: false, price: "", marketprice: "" },
      Beans: { available: false, price: "", marketprice: "" },
      Brinjal: { available: false, price: "", marketprice: "" },
      Cabbage: { available: false, price: "", marketprice: "" },
      "Cauli Flower": { available: false, price: "", marketprice: "" },
      Chilli: { available: false, price: "", marketprice: "" },
      "Cow Pea": { available: false, price: "", marketprice: "" },
      Garlic: { available: false, price: "", marketprice: "" },
      Cucumber: { available: false, price: "", marketprice: "" },
      Ginger: { available: false, price: "", marketprice: "" },
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [vegName, field] = name.split(".");

      setFormData((prev) => ({
        ...prev,
        vegetables: {
          ...prev.vegetables,
          [vegName]: { ...prev.vegetables[vegName], [field]: value },
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const vegetableName = name.split(".")[0];
    setFormData((prev) => ({
      ...prev,
      vegetables: {
        ...prev.vegetables,
        [vegetableName]: { ...prev.vegetables[vegetableName], available: checked },
      },
    }));
  };

  const vegetablesList = [
    "Tomato", "Potato", "Beans", "Brinjal", "Cabbage", "Cauli Flower", "Chilli",
    "Cow Pea", "Garlic", "Cucumber", "Ginger"
  ];

  const handleSubmit = () => {
    if (isSubmitted) {
      console.log("Updated data:", formData);
    } else {
      console.log("Form submitted:", formData);
    }
    setIsSubmitted(true);
  };

  return (
    <Box className="b1" sx={{ display: "flex", flexDirection: "column", minHeight: "100vh",backgroundImage:"url(/a2.avif)",backgroundSize:"cover" }}>

      <header>
        <Typography variant="h4" component="h1" align="center" gutterBottom className="title">
          Manage Your Vegetable Inventory
        </Typography>
      </header>
      <Box className="child">
        <section>


          <Grid container spacing={6}>
            <Grid item xs={12} md={4}> <Fade in={true} timeout={500}>
              <Accordion
                expanded={expanded}
                onChange={() => setExpanded(!expanded)}
                className={expanded ? 'accordion-active' : ''}
                sx={{ margin: "10px 0px" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6" className="title1">Use of direction</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" paragraph>
                    <strong>Step 1:-</strong><br></br> Fill in your personal details including Name, Mobile No, Location, and Time slot.
                    <br />
                    <strong>Step 2:-</strong><br></br> Update your availability, location, and day so customers can contact you easily.
                    <br />
                    <strong>Step 3:-</strong><br></br> Update the daily rates for your vegetables and specify the market price for comparison.
                    <br />
                    <strong>Step 4:-</strong><br></br> Mark whether each vegetable is available for sale, so customers can see your inventory status.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    aria-label="add"
                    className="submit-btn"
                    size="small"
                  >
                    Click here to add extra option
                  </Button>
                </AccordionDetails>
              </Accordion>
            </Fade>

            </Grid>
            <Grid item xs={12} md={4}>
              <Divider>  <Chip label="Fill the Form" className="chip" /></Divider>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    size="small"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    aria-label="Enter your full name"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Mobile No"
                    name="mobile"
                    size="small"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    aria-label="Enter your mobile number"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    size="small"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    aria-label="Enter your location"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Time</InputLabel>
                    <Select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      label="Time"
                      required
                      aria-label="Select preferred time slot"
                    >
                      <MenuItem value="Morning">Morning</MenuItem>
                      <MenuItem value="Afternoon">Afternoon</MenuItem>
                      <MenuItem value="Evening">Evening</MenuItem>
                      <MenuItem value="Night">Night</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Day</InputLabel>
                    <Select
                      name="day"
                      value={formData.day}
                      onChange={handleInputChange}
                      label="Day"
                      required
                      aria-label="Select the day"
                    >
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <MenuItem key={day} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormGroup>
                {vegetablesList.map((veg) => (
                  <Grid container spacing={2} key={veg}>
                    <Grid item xs={12} sm={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={`${veg}.available`}
                            checked={formData.vegetables[veg].available}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={`${veg}`}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        size="small"
                        fullWidth
                        label={`${veg} Price`}
                        name={`${veg}.price`}
                        value={formData.vegetables[veg].price}
                        onChange={handleInputChange}
                        aria-label={`Enter ${veg} price`}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        size="small"
                        fullWidth
                        label={`${veg} Market Price`}
                        name={`${veg}.marketprice`}
                        value={formData.vegetables[veg].marketprice}
                        onChange={handleInputChange}
                        aria-label={`Enter ${veg} market price`}
                      />
                    </Grid>
                  </Grid>
                ))}
              </FormGroup>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                aria-label="Submit or Update your details"
                className="submit-btn"
                size="small"
              >
                {isSubmitted ? "Update" : "Submit"}
              </Button>
            </Grid>

          </Grid>
        </section>
      </Box>
    </Box>
  );
};

export default Page;
