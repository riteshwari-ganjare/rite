
"use client";
import { Card, Box, Container, Typography, Grid, Divider } from '@mui/material';
import * as page1 from './page1';
import { images, images1, city, bot } from "./data.js";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import Image from 'next/image';
import React, { Suspense } from 'react';
const Available = React.lazy(() => import('@/components/Available'));
const Bottom = React.lazy(() => import('@/components/Bottom'));

const OfferImage = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    width={126}
    height={163}
    style={{
      objectFit: 'cover',
      boxShadow: '3px 4px 8px 0 rgba(0, 0, 0, 0.25)',
      borderRadius: '8px 0px',
    }}
  />
);

const OfferImage1 = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    width={500}
    height={140}
    style={{
      objectFit: 'cover',
      boxShadow: '3px 4px 8px 0 rgba(0, 0, 0, 0.25)',
      borderRadius: '8px 8px 0px 0px',
      transition: 'transform 0.3s ease-in-out',
      borderBottom: "2px solid #FF645A",
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = 'scale(1.05)';
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'scale(1)';
    }}
  />
);

const Page = () => {
  return (
    <>
      <Container sx={{ mt: 1, mb: 1, p: 1 }}>
        <Container sx={{ mt: 2, mb: 6, p: 1 }}>
          <Typography variant="h5" sx={{ textAlign: 'left', mb: 2, fontSize: '1.4rem', fontWeight: 700 }}>
            Best Offers
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              {images1.map((image, index) => (
                <Grid item xs={4} sm={3} md={1.5} lg={1.5} key={index}>
                  <OfferImage src={image.src} alt={image.alt} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
        
        <Container sx={{ mt: 4, mb: 4, p: 1 }}>
          <Box sx={page1.b1}>
            <Typography variant="h5" sx={{ textAlign: 'left', mb: 2, fontSize: '1.4rem', fontWeight: 700 }}>
              Restaurants Near You
            </Typography>
            <Link href="/" passHref>
              <Typography sx={page1.seeMore}>See All</Typography>
            </Link>
          </Box>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: { xs: 1, sm: 2, md: 3 },
              '&:hover .arrow-icon': {
                visibility: 'visible',
                opacity: 1
              },
            }}
          >
            <Grid container spacing={2}>
              {images.map((image, index) => (
                <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      height: '240px',
                      boxShadow: 'none',
                      transition: 'box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <Box>
                      <OfferImage1 src={image.src} alt={image.alt} />
                    </Box>
                    <Box sx={{ padding: '8px', flex: 1, position: 'relative' }}>
                      <Typography variant="h4" sx={{ fontSize: '16px', fontWeight: 700 }}>
                        {image.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'gray', marginBottom: '8px' }}>
                        {image.address}
                      </Typography>
                      {image.off && <Typography sx={page1.off}>{image.off}</Typography>}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          backgroundColor: '#8cbb0f',
                          borderRadius: '2px',
                          boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#fff',
                          padding: '3px 6px',
                        }}
                      >
                        {image.rating}
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box
              className="arrow-icon"
              sx={{
                position: 'absolute',
                top: '50%',
                right: '0px',
                transform: 'translateY(-50%)',
                backgroundColor: '#eee',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                visibility: 'hidden',
                opacity: 0,
                zIndex: 10,
                transition: 'visibility 0s, opacity 0.3s ease, transform 0.5s ease',
                '&:hover': {
                  transform: 'translateY(-50%) translateX(10px)',
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ArrowForwardIcon sx={{ color: '#ff645A', fontSize: '20px' }} />
            </Box>
          </Box>
        </Container>
                <React.Suspense fallback={<div>Loading...</div>}>
          <Available city={city} />
        </React.Suspense>
        
        <Divider sx={{ width: '100%', my: 2 }} />
        
        <React.Suspense fallback={<div>Loading...</div>}>
          <Bottom bot={bot} />
        </React.Suspense>
      </Container>
    </>
  );
};

export default Page;
