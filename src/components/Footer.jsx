import React from 'react';
import { Box, Typography, IconButton, Divider, Grid, Container } from '@mui/material';
import {
  YouTube as YouTubeIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  WhatsApp as WhatsAppIcon,
  Mail as MailIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';

const headerStyle = {
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#000',
  marginBottom: '10px',
  
};

const addressStyle = {
  color: '#666',
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '1.6', // Adjust this value for line spacing
};


const socialMediaLinks = [
  {
    href: 'https://youtube.com',
    icon: <YouTubeIcon sx={{ color: 'white', height: '18px', width: '18px' }} />,
    bgcolor: 'rgb(212, 36, 40)',
    label: 'YouTube',
  },
  {
    href: 'https://facebook.com/riteshwari.ganjare.33/',
    icon: <FacebookIcon sx={{ color: 'white', height: '18px', width: '18px' }} />,
    bgcolor: 'rgb(58, 90, 152)',
    label: 'Facebook',
  },
  {
    href: 'https://www.instagram.com/rit_esh_war_e',
    icon: <InstagramIcon sx={{ color: 'white', height: '18px', width: '18px' }} />,
    bgcolor: '#E1306C',
    label: 'Instagram',
  },
  {
    href: 'https://wa.me/8411915054',
    icon: <WhatsAppIcon sx={{ color: 'white', height: '18px', width: '18px' }} />,
    bgcolor: '#25D366',
    label: 'WhatsApp',
  },
  {
    href: 'mailto:rganjare22@gmail.com',
    icon: <MailIcon sx={{ color: 'white', height: '18px', width: '18px' }} />,
    bgcolor: '#D44638',
    label: 'Mail',
  },
];

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact Us' },
];

const SocialMediaIcons = () => (
  <Grid container spacing={1} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
    {socialMediaLinks.map(({ href, icon, bgcolor, label }, index) => (
      <Grid item key={index}>
        <IconButton
          sx={{
            bgcolor,
            borderRadius: '50%',
            '&:hover': { backgroundColor: bgcolor },
          }}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          {icon}
        </IconButton>
      </Grid>
    ))}
  </Grid>
);

const NavLinks = () => (
  <nav aria-label="Footer navigation">
    <Grid container spacing={1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: { xs: 'left', md: 'flex-start' } }}>
      {navLinks.map(({ href, label }, index) => (
        <Grid item key={index}>
          <Link
            href={href}
            style={{
              textDecoration: 'none',
              color: '#666',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
            aria-label={`Navigate to ${label}`}
          >
            {label}
          </Link>
        </Grid>
      ))}
    </Grid>
  </nav>
);

const Footer = () => {
  return (
    <footer>
      <Divider sx={{ width: '100%', mb: 2 }} />
      <Container sx={{ padding: '60px' }}>
      <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    textAlign: { xs: 'center', md: 'left' }, // Center text only for xs
    alignItems: { xs: 'center', md: 'flex-start' }, // Center items for xs
    paddingBottom: '10px',
  }}
>
  <Grid container sx={{ width: '100%', justifyContent: { xs: 'center', md: 'flex-start' } }}>
    <Grid item xs={12} md={3} sx={{ padding: '10px 0' }}>
      <Typography sx={headerStyle}>
        <Image src="/logo.png" alt="Logo" width={155} height={45.78} layout="intrinsic" />
      </Typography>
      <address style={addressStyle}>"Your trusted partner for growth and collaboration."</address>
    </Grid>
    <Grid item xs={12} md={3} sx={{ padding: '10px 0' }}>
      <Typography sx={headerStyle}>Address</Typography>
      <address style={addressStyle}>Katol, Nagpur,<br /> Maharashtra, India <br />- 441302</address>
    </Grid>
    <Grid item xs={12} md={3} sx={{ padding: '10px 0' }}>
      <Typography sx={headerStyle}>Links</Typography>
      <NavLinks />
    </Grid>
    <Grid item xs={12} md={3} sx={{ padding: '10px 0' }}>
      <Typography sx={headerStyle}>Follow us:</Typography>
      <SocialMediaIcons />
    </Grid>
  </Grid>
</Box>

      </Container>
      <Divider sx={{ width: '100%' }} />
      <Container>
        <Box sx={{ textAlign: 'center', py: 1 }}>
          <Typography variant="body1" sx={{ mb: 1, mt: 1, color: '#000', fontSize: '12px', fontWeight: 'bold' }}>
            Find the best Royal Designed with best offers
          </Typography>
          <Typography variant="body2" sx={{ color: '#000', fontSize: '12px' }}>
            © 2024 - Designed by Riteshwari
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
