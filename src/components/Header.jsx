"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import * as styles from "./styles";
import { IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Hamburger Icon
import CloseIcon from "@mui/icons-material/Close"; // Cross Icon
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Phone as PhoneIcon, LocationOn as LocationIcon } from "@mui/icons-material";

const pages = ["Home", "About", "Service", "Contact Us"];

function ResponsiveAppBar() {
  const [selectedPage, setSelectedPage] = React.useState("Home");
  const [openMobileMenu, setOpenMobileMenu] = React.useState(false); // Mobile menu state
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleMobileMenuOpen = () => {
    setOpenMobileMenu(true);
  };

  const handleMobileMenuClose = () => {
    setOpenMobileMenu(false);
  };

  const handlePageSelect = (page) => {
    setSelectedPage(page);
    setOpenMobileMenu(false); // Close the mobile menu after selecting a page
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
          textAlign: "left",
          p: 1,
          paddingBottom: "10px",
          justifyContent: "space-between",
          background: "#f6f6f6",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <LocationIcon sx={{ color: "#000", fontSize: "16px" }} />
          <Typography
            variant="body2"
            sx={{
              color: "#000",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Katol, Nagpur, Maharashtra - 441302
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <PhoneIcon sx={{ color: "#000", fontSize: "16px" }} />
          <Typography
            variant="body2"
            sx={{
              color: "#000",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Call us at +1 234 567 890
          </Typography>
        </Box>
      </Box>
      <AppBar position="static" sx={styles.appBarStyles}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>
              <Typography variant="h6" noWrap component="a" href="/" sx={styles.logoStylesLarge}>
                <Image src="/logo.png" alt="Logo" width={155} height={45.78} layout="intrinsic" />
              </Typography>
              <Typography variant="h5" noWrap component="a" href="/" sx={styles.logoStylesSmall}>
                <Image src="/logo.png" alt="Logo" width={110} height={35} layout="intrinsic" />
              </Typography>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  justifyContent: "space-evenly",
                }}
              >
                {pages.map((page) => (
                  <Link
                    href={
                      page.toLowerCase() === "home"
                        ? "/"
                        : `/${page.toLowerCase().replace(/\s+/g, "")}`
                    }
                    key={page}
                    passHref
                  >
                    <Button
                      onClick={() => handlePageSelect(page)}
                      sx={{
                        ...styles.navLinkButtonStyles,
                        color: selectedPage === page ? "#FF7E5F" : "inherit",
                        transition: "color 0.3s ease",
                        "&:hover": { color: "#FF7E5F" },
                      }}
                    >
                      {page}
                    </Button>
                  </Link>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Link href="/login" passHref>
                  <Button sx={styles.contactButtonStyles}>Log In</Button>
                </Link>
              </Box>

              <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
                <IconButton size="large" aria-label="mobile menu" color="inherit" onClick={handleMobileMenuOpen}>
                  <MenuIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>

        <Drawer
          anchor="right"
          open={openMobileMenu}
          onClose={handleMobileMenuClose}
          sx={{
            width: "250px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "250px",
              backgroundColor: "#333",
              color: "white",
              padding: "20px",
              transition: "transform 0.3s ease, opacity 0.3s ease",
            },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleMobileMenuClose}
              sx={{ alignSelf: "flex-end", marginBottom: "20px" }}
            >
              <CloseIcon />
            </IconButton>

            {pages.map((page) => (
              <Link
                href={
                  page.toLowerCase() === "home"
                    ? "/"
                    : `/${page.toLowerCase().replace(/\s+/g, "")}`
                }
                key={page}
                passHref
              >
                <Button
                  onClick={() => handlePageSelect(page)}
                  sx={{
                    ...styles.navLinkButtonStyles,
                    color: selectedPage === page ? "#FF7E5F" : "white",
                    marginBottom: "20px",
                    transition: "color 0.3s ease",
                    "&:hover": { color: "#FF7E5F" },
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}

            <Button sx={styles.contactButtonStyles} onClick={handleLoginClick}>
              Login
            </Button>
          </Box>
        </Drawer>
      </AppBar>
    </>
  );
}

export default ResponsiveAppBar;
