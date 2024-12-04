"use client";

import React from 'react';
import { Box, Grid, TextField, Button, Typography, Container } from '@mui/material';
import * as styles from '../../components/styles';

const Page = () => {
  return (
    <>
      <Container>
        <Box
          sx={{
            width: '100%',
            height: '90vh', // Full viewport height
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Responsive Background Image */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/contact.png)', // Access the image from the public folder
              backgroundSize: 'cover', // Ensures the image covers the container
              backgroundPosition: 'center', // Centers the image
              backgroundRepeat: 'no-repeat',
              zIndex: -1, // Places the image behind the content
              display: { xs: 'none', sm: 'block' }, // Hides the image on small screens
              borderBottom: "1px solid #eee",
              transition: 'background-size 0.5s ease, opacity 0.5s ease', // Smooth transition
              '&:hover': {
                backgroundSize: '110%', // Zoom effect on hover
              },
            }}
          ></Box>

          {/* Grid Container */}
          <Grid
            container
            sx={{
              width: '100%',
              animation: 'fade-in 1s ease', // Fade-in animation for the grid
              '@keyframes fade-in': {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            {/* Left Side - Form */}
            <Grid
              item
              xs={12} // Full width on small screens
              sm={5} // 5 columns on small and larger screens
              sx={{
                padding: { xs: 2, sm: 3, md: 6 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center', // Centers the content in the left grid
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Optional background color for the form area
                zIndex: 1, // Ensures the form content is in front of the image
                marginTop: { xs: 0, sm: 4 }, // Adjusts the margin for small screens
                transition: 'transform 0.5s ease', // Smooth scaling effect
                '&:hover': {
                  transform: 'scale(1.02)', // Slight zoom-in effect
                },
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                Contact Us
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  mb: 3,
                  fontSize: '0.9rem',
                }}
              >
                Fill in the form below, and we will get back to you as soon as possible.
              </Typography>

              <form style={{ width: '100%' }}>
                <TextField
                  label="Full Name"
                  fullWidth
                  size="small"
                  variant="outlined"
                  margin="dense"
                  required
                />
                <TextField
                  label="Email"
                  fullWidth
                  size="small"
                  variant="outlined"
                  margin="dense"
                  required
                />
                <TextField
                  label="Contact Number"
                  fullWidth
                  size="small"
                  variant="outlined"
                  margin="dense"
                  required
                />
                <TextField
                  label="Message"
                  fullWidth
                  size="small"
                  variant="outlined"
                  margin="dense"
                  multiline
                  rows={4}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    ...styles.contactButtonStyles1,
                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#004d40', // Darker shade on hover
                      transform: 'translateY(-2px)', // Slight lift on hover
                    },
                  }}
                >
                  Send
                </Button>
              </form>
            </Grid>

            {/* Right Side - Empty */}
            <Grid
              item
              xs={12} // Full width on small screens
              sm={7} // 7 columns on small and larger screens
              sx={{
                display: { xs: 'none', sm: 'block' }, // Hides the right side on small screens
              }}
            />
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Page;
