

export const appBarStyles = {
  backgroundColor: 'white',
  color: 'black',
  position: "relative",
  padding: {xs:"0px",md:"0px 180px"},
  boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)"
};

export const logoStylesLarge = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'black',
  textDecoration: 'none',
};

export const logoStylesSmall = {
  mr: 2,
  display: { xs: 'flex', md: 'none' },
  flexGrow: 1,
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'black',
  textDecoration: 'none',
};

export const mobileMenuStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'black',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1300,
  color: 'white',
};

export const closeIconStyles = {
  position: 'absolute',
  top: 20,
  right: 20,
  color: 'white',
  zIndex: 1400,
};

export const menuItemBoxStyles = {
  width: '100%',
  textAlign: 'center',
  padding: '20px',
};

export const menuItemTextStyles = {
  color: 'black',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  borderBottom: '1px solid #eee',
};

export const navLinkButtonStyles = {
  my: 2,
  color: 'black',
  display: 'block',
  fontSize: "14px",
  fontFamily: '"Metropolis", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
};
export const contactButtonStyles1 = {
  height: "32px",
  width: "100%",
  color: 'white',
  backgroundColor: "#FF7E5F",
  padding: "3.5px 35px",
  fontSize: "12px",
  fontWeight: "bold", '&:hover': {
    background: 'red', 
  },
 
};
export const contactButtonStyles = {
  height: "32px",
  width: "208px",
  color: 'white',
  backgroundColor: "#FF7E5F",
  padding: "3.5px 35px",
  fontSize: "12px",
  fontWeight: "bold", '&:hover': {
    background: 'red', 
  },
  display:{xs:"none",md:"flex"}
};
export const head={
color:"#FF7E5F",
fontSize:"16px",
marginBottom:"0.5rem",
fontWeight:"bold",
}
export const head1={
  color:"#FF7E5F",
  fontSize:"16px",
  marginBottom:"0.5rem",
  fontWeight:"bold",
  }
export const element={
  color:"#666",
  cursor:"pointer",
  fontSize:"14px",
  '&:hover':{
    color:"#000"
  }
}