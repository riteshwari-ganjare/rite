"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from 'next/link';
import * as styles from './styles';  
import LocationOnIcon from '@mui/icons-material/LocationOn';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MenuItem, Select, FormControl } from '@mui/material';
import Image from 'next/image';

const pages = ['Home', 'Book a Table', 'Blog'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [selectedPage, setSelectedPage] = React.useState('Home');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={styles.appBarStyles}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Typography variant="h6" noWrap component="a" href="/" sx={styles.logoStylesLarge}>
              <Image
                src="https://im1.dineout.co.in/images/uploads/misc/2023/Jun/19/swiggy_dineout_logo.png"
                alt="Logo"
                width={125}
                height={38.78}
                layout="intrinsic"
              />
            </Typography>
            <Typography variant="h5" noWrap component="a" href="/" sx={styles.logoStylesSmall}>
              <Image
                src="https://im1.dineout.co.in/images/uploads/misc/2023/Jun/19/swiggy_dineout_logo.png"
                alt="Logo"
                width={110}
                height={35}
                layout="intrinsic"
              />
            </Typography>
            <FormControl sx={{ minWidth: 220, ml: 3, height: 35 }} size="small">
              <Select
                displayEmpty
                input={<OutlinedInput sx={{ height: 35, padding: '0px 0px', fontSize: '12px' }} />}
                renderValue={() => (
                  <span style={{ display: 'flex', alignItems: 'center', color: 'gray', fontSize: '12px' }}>
                    <LocationOnIcon sx={{ mr: 1, color: 'gray', fontSize: "14px" }} />
                    <em>Select Location</em>
                  </span>
                )}
                inputProps={{ 'aria-label': 'Location' }}
              >
                <MenuItem disabled value="">
                  <em>Select Location</em>
                </MenuItem>
              </Select>
            </FormControl>

          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "space-around" }}>
            {pages.map((page) => (
              <Link
                href={page.toLowerCase() === "home" ? "/" : `/${page.toLowerCase().replace(/\s+/g, "")}`}
                key={page}
                passHref
              >
                <Button
                  onClick={() => setSelectedPage(page)}
                  sx={{
                    ...styles.navLinkButtonStyles,
                    color: selectedPage === page ? 'red' : 'inherit',
                    '&:hover': { color: 'red' },
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Link href="/" passHref>
              <Button sx={styles.contactButtonStyles}>Login</Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
