import React from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link from 'next/link';
import Image from 'next/image'; 
const Footer = () => {
  return (
    <>
      <Divider sx={{ width: '100%', my: 2 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          py: 3,
          paddingBottom: "40px"
        }}
      >
        <Image
          src="https://im1.dineout.co.in/images/uploads/misc/2023/Jun/19/swiggy_dineout_logo.png"
          alt="Logo"
          width={110}
          height={35}
        />
        <Typography variant="body1" sx={{ mb: 1, mt: 1, color: '#666', fontSize: "12px" }}>
          Find the best Restaurants, Deals, Discounts & Offers
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', fontSize: "14px" }}>
          Write to us at:{' '}
          <strong>
            <Link href="mailto:dineout.helpdesk@swiggy.in" passHref>
              dineout.helpdesk@swiggy.in
            </Link>
          </strong>
        </Typography>
        <Box sx={{
          display: 'flex', gap: 1, mt: 2, mb: 4, height: "20px", width: "20px", alignItems: 'center',
          textAlign: 'center', justifyContent: "center"
        }}>
          <IconButton sx={{ bgcolor: 'rgb(212, 36, 40)', borderRadius: '50%' }} href="https://youtube.com" target="_blank">
            <YouTubeIcon sx={{ color: 'white', height: "18px", width: "18px" }} />
          </IconButton>
          <IconButton sx={{ bgcolor: 'rgb(58, 90, 152)', borderRadius: '50%' }} href="https://facebook.com" target="_blank">
            <FacebookIcon sx={{ color: 'white', height: "18px", width: "18px" }} />
          </IconButton>
          <IconButton sx={{ bgcolor: '#E1306C', borderRadius: '50%' }} href="https://instagram.com" target="_blank">
            <InstagramIcon sx={{ color: 'white', height: "18px", width: "18px" }} />
          </IconButton>
          <IconButton sx={{ bgcolor: '#1DA1F2', borderRadius: '50%' }} href="https://twitter.com" target="_blank">
            <TwitterIcon sx={{ color: 'white', height: "18px", width: "18px" }} />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ color: '#666', fontSize: "12px" }}>
          © 2022 - Swiggy All Rights Reserved
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
