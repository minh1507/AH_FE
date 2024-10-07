import * as React from "react";
import { Route, Routes, Link } from "react-router-dom"; 
import { lazy, useState } from "react";
import { styled, useTheme } from "@mui/system";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WatchIcon from "@mui/icons-material/Watch"; // Assuming same icon for categories
import Logo from "../assets/handle-logo.png";
import useMediaQuery from '@mui/material/useMediaQuery'; // Import useMediaQuery for mobile view

const Home = lazy(() => import("./home/home"));
const About = lazy(() => import("./about/about"));
const Contact = lazy(() => import("./contact/contact")); 

const PortalModule = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control Drawer
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if mobile view

  const Footer = styled(Box)({
    backgroundColor: "#ff4b7b",
    padding: "20px",
    marginTop: "30px",
    textAlign: "center",
  });

  const FooterLink = styled(Link)({
    color: "#fff",
    textDecoration: "none",
    margin: "0 10px",
    '&:hover': {
      textDecoration: "underline",
    },
  });

  const PinkAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "#ff4b7b",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
  }));

  const StyledButton = styled(Button)({
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    marginLeft: "20px",
    '&:hover': {
      backgroundColor: "#ff668c", 
    },
  });

  const LogoContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  // Categories list for the drawer
  const categories = [
    { name: "Váy", icon: <WatchIcon style={{ color: "#ff4b7b" }} /> },
    { name: "Quần", icon: <WatchIcon style={{ color: "#ff4b7b" }} /> },
    { name: "Áo", icon: <WatchIcon style={{ color: "#ff4b7b" }} /> },
  ];

  // Function to toggle the drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <PinkAppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)} // Open drawer on click
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <LogoContainer>
            <img
              src={Logo}
              alt="An Hoàng Store Logo"
              style={{ height: "60px", marginRight: "10px" }}
            />
            <Typography variant="h6" sx={{ display: { xs: "none", md: "block" } }}>
              An Hoàng Store
            </Typography>
          </LogoContainer>

          <Box sx={{ flexGrow: 1 }} />

          <StyledButton>Đăng nhập</StyledButton>
        </Toolbar>
      </PinkAppBar>

      {/* Drawer for mobile category list */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)} // Close drawer on backdrop click
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)} // Close drawer on category click
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {categories.map((category, index) => (
              <ListItem button key={index}>
                <ListItemIcon>
                  {category.icon}
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer>
        <Typography variant="body1">
          © 2024 Bản quyền thuộc về An Hoàng Store.
        </Typography>
        <Box mt={2}>
          <FooterLink to="/privacy">Chương trình giảm giá</FooterLink>
          <FooterLink to="/terms">Quy định</FooterLink>
          <FooterLink to="/faq">Về chúng tôi</FooterLink>
        </Box>
      </Footer>
    </>
  );
}

export default PortalModule;
