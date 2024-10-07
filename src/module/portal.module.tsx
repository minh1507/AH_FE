import * as React from "react";
import { Route, Routes, Link } from "react-router-dom"; // Import Link from react-router-dom
import { lazy } from "react";
import { styled } from "@mui/system";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/handle-logo.png";

const Home = lazy(() => import("./home/home"));
const About = lazy(() => import("./about/about"));
const Contact = lazy(() => import("./contact/contact")); 

const PortalModule = () => {
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

  return (
    <>
      <PinkAppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

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
