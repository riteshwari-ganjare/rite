"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Grid, Container, Divider } from "@mui/material";
import Head from "next/head";
import Image from "next/image";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  const cardsData = [
    {
      title: "Our Vision",
      description:
        "To revolutionize the way people experience convenience by empowering small businesses across every sector, creating a vibrant ecosystem that delivers trusted, high-quality services directly to your doorstep, anytime, anywhere.",
      image: "/vision.jpg",
    },
    {
      title: "Our Mission",
      description:
        "We are on a mission to connect small businesses to the world, providing them with a platform to deliver essential products and services directly to customers' doors. From food and groceries to laundry, healthcare, and beyond — we aim to simplify lives by making services more accessible and efficient for all.",
      image: "/mission.jpg",
    },
    {
      title: "Our Promise",
      description:
        "We promise to be the bridge between you and the services you need, delivering convenience, reliability, and trust. Whether you're craving fresh food, need laundry done, or require professional services, our platform ensures top-tier experiences every time.",
      image: "/promise.jpg",
    },
    {
      title: "Our Values",
      description:
        "At the heart of everything we do lies a commitment to innovation, community, and service. We value the diverse range of businesses we partner with and strive to offer customers an unparalleled experience, fostering a seamless connection between them and local entrepreneurs.",
      image: "/values.jpg",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>About Us | Fresh Veggies</title>
        <meta name="description" content="Learn more about our mission, values, and team." />
        <meta property="og:title" content="About Us" />
        <meta property="og:description" content="Discover our story, mission, and vision for doorstep services." />
        <meta name="robots" content="index, follow" />
      </Head>

      <Box
        sx={{
          backgroundImage: "url('/Home.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          position: "relative",
          zIndex: 1,
          "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9))",
            zIndex: -1,
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "600px",
            background: "rgba(255, 255, 255, 0.1)",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.8s ease-out",
          }}
        >
          <Box sx={{ marginBottom: "24px" }}>
            <Image
              src="/rit.png"
              alt="Profile Image"
              width={150}
              height={150}
              loading="lazy"
              style={{
                borderRadius: "50%",
                border: "4px solid #FF7E5F",
                objectFit: "cover",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              marginBottom: "16px",
              display: "inline-block",
              position: "relative",
            }}
          >
            Riteshwari Ganjare
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "120%",
                borderBottom: "1px solid #FF7E5F",
              }}
            />
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            We believe in empowering small businesses and entrepreneurs by bringing them closer to customers through a seamless platform. We are here to simplify lives by delivering everything you need, from groceries to healthcare, right at your doorstep.
          </Typography>
        </Box>
      </Box>

      <Container>
        <Box sx={{ padding: "60px 20px" }}>
          <Divider>
            <Typography variant="h4" sx={{ fontWeight: 700, margin: "60px 0px", textAlign: "center", color: "#000" }}>
              About Us
            </Typography>
          </Divider>

          <Grid container spacing={4} justifyContent="center">
            {cardsData.map((card, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  transition: "transform 0.4s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Card
                  sx={{
                    maxWidth: "100%",
                    height: "480px",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    perspective: "1000px",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "100%", transition: "transform 0.6s", transformStyle: "preserve-3d" }}>
                    <CardMedia
                      component="img"
                      alt={card.title}
                      image={card.image}
                      loading="lazy"
                      sx={{
                        height: "200px",
                        width: "100%",
                        objectFit: "cover",
                        backfaceVisibility: "hidden",
                      }}
                    />
                    <CardContent sx={{ flex: "1 1 auto", backfaceVisibility: "hidden" }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          color: "#FF7E5F",
                          fontSize: "1.4rem",
                          marginBottom: "1.5rem",
                          fontWeight: "700",
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.description}
                      </Typography>
                    </CardContent>

                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#FF7E5F",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "1.5rem",
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      Hi
                    </Box>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default AboutUs;
