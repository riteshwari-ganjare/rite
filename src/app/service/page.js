"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Divider, Container } from "@mui/material";
import Image from "next/image";

const ServicePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const servicesData = [
    {
      title: "Web Development",
      description:
        "We provide cutting-edge web development services, building responsive and scalable websites tailored to your business needs. Whether you need a personal blog or a corporate website, we ensure top-notch functionality and design.",
      image: "/web.jpg",
    },
    {
      title: "Software Development",
      description:
        "Our software development services cater to businesses of all sizes. From custom applications to automation tools, we create software solutions that are reliable, efficient, and scale as your business grows.",
      image: "/software.jpg",
    },
    {
      title: "Mobile App Development",
      description:
        "We create mobile apps that provide seamless experiences for your users. Our development process covers iOS and Android platforms, ensuring your app is optimized for performance and usability.",
      image: "/app.jpg",
    },
    {
      title: "E-commerce Solutions",
      description:
        "From product catalogs to payment integrations, we build fully-featured e-commerce platforms. Our solutions help you drive sales while providing a smooth shopping experience for your customers.",
      image: "/ecom.jpg",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#0d1b2a", padding: "60px 0", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <Container>
        {/* Title */}
        <Box sx={{ textAlign: "center", marginBottom: "60px" }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: "#FF7E5F", letterSpacing: "1px", marginBottom: "20px" }}>
            Our Services
          </Typography>
          <Typography variant="h6" sx={{ color: "#A3A8B2", marginTop: "20px" }}>
            We specialize in creating tailored digital solutions for a variety of domains, including education, business, healthcare, and more.
          </Typography>
        </Box>

        {/* Service Cards */}
        <Grid container spacing={4} justifyContent="center">
          {servicesData.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: "flex", justifyContent: "center" }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  maxWidth: 345,
                  borderRadius: "16px",
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
                  transition: "transform 0.4s ease-in-out, box-shadow 0.3s ease, background-color 0.3s ease",
                  overflow: "hidden",
                  height: "100%",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 16px 32px rgba(0, 0, 0, 0.3)",
                    // backgroundColor: "#1a2635", // Darken the background on hover
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={service.image}
                  alt={service.title}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    filter: "brightness(100%)",
                    transition: "filter 0.3s ease-in-out",
                    "&:hover": {
                      filter: "brightness(70%)",
                    },
                  }}
                />
                <CardContent
                  sx={{
                    // backgroundColor: "#1a2635",
                    padding: "20px",
                    position: "relative",
                    flex: 1,
                    "&:last-child": {
                      paddingBottom: "20px", // Ensure no extra padding at the bottom
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#FF7E5F",
                      marginBottom: "12px",
                      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#A3A8B2", marginBottom: "20px" }}>
                    {service.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FF7E5F",
                      "&:hover": { backgroundColor: "#FF6A3A" },
                      padding: "10px 20px",
                      borderRadius: "50px",
                      textTransform: "none",
                      fontWeight: 600,
                      letterSpacing: "1px",
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Divider Section */}
        <Box sx={{ marginTop: "60px", textAlign: "center" }}>
          <Divider sx={{ marginBottom: "40px", borderColor: "#A3A8B2" }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#FF7E5F", marginBottom: "20px" }}>
            Why Choose Us?
          </Typography>
          <Typography variant="body1" sx={{ color: "#A3A8B2", maxWidth: "600px", margin: "0 auto" }}>
            Our team is committed to delivering high-quality services tailored to your business needs. From web development to software and mobile apps, we offer comprehensive solutions designed to help you thrive in today’s digital world.
          </Typography>
        </Box>

        {/* Animation Section */}
        <Box sx={{ marginTop: "60px", textAlign: "center" }}>
          <Box
            sx={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(50px)",
              transition: "all 0.8s ease-out",
              marginBottom: "40px",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "1px" }}>
              Your Partner in Growth
            </Typography>
            <Typography variant="h6" sx={{ color: "#A3A8B2", marginTop: "20px", maxWidth: "700px", margin: "0 auto" }}>
              We help businesses grow by providing technology solutions that are scalable, secure, and user-friendly. From small startups to large enterprises, our services are designed to meet your unique needs.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ServicePage;
