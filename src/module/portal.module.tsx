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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputBase,
  Badge,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logo from "../assets/handle-logo.png";
import useMediaQuery from '@mui/material/useMediaQuery';
import Detail from "./detail/detail";
import Cart from "./cart/cart";

const Home = lazy(() => import("./home/home"));
const About = lazy(() => import("./about/about"));
const Contact = lazy(() => import("./contact/contact"));

const PortalModule = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const WhiteAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "#ffffff", // White background
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "0 !important"
  }));

  const LogoContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const SearchContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "0 10px",
    borderRadius: "4px",
    marginLeft: "20px",
    width: "40%",
  });

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    border: '2px solid transparent', // Default border
    borderRadius: '4px', // Optional: add some border radius
    padding: '8px 12px', // Adjust padding as needed
    transition: 'border-color 0.3s ease', // Smooth transition for border color

    // Change border color on focus
    '&:focus': {
      border: '2px solid #ff4b7b', // Pink border on focus
      outline: 'none', // Remove default outline
    },
  }));

  const MainContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  });

  const ContentContainer = styled(Box)({
    flexGrow: 1,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLoginOpen = () => {
    setLoginDialogOpen(true);
  };

  const handleLoginClose = () => {
    setLoginDialogOpen(false);
  };

  return (
    <MainContainer>
      <WhiteAppBar position="static">
        <Container maxWidth="lg" sx={{ padding: "0 !important" }}>
          <Toolbar sx={{ padding: "0 !important" }}>
            {isMobile && (
              <IconButton
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ mr: 2, color: "#ff4b7b" }} // Light pink for menu icon
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <LogoContainer>
              <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
                <img
                  src={Logo}
                  alt="An Hoàng Store Logo"
                  style={{ height: "100px", marginRight: "10px" }} // Huge logo height
                />
                <Typography variant="h6" sx={{ display: { xs: "none", md: "block" }, color: "#ff4b7b" }}>
                  An Hoàng Store
                </Typography>
              </Link>
            </LogoContainer>

            {/* Conditionally render Search Bar based on screen size */}
            {!isMobile && (
              <SearchContainer sx={{ display: 'flex', alignItems: 'center', ml: 3 }}> {/* Added margin left for spacing */}
                <SearchIcon sx={{ color: "#ff4b7b" }} /> {/* Light pink for search icon */}
                <StyledInputBase
                  placeholder="Tìm kiếm sản phẩm…"
                  inputProps={{ 'aria-label': 'search' }}
                  sx={{ ml: 1 }} // Added margin for better spacing
                />
              </SearchContainer>
            )}

            <Box sx={{ flexGrow: 1 }} />

            {/* Account and Cart Icons */}
            <IconButton sx={{ color: "#ff4b7b" }} onClick={handleLoginOpen}> {/* Light pink for account icon */}
              <AccountCircleIcon />
            </IconButton>
            <IconButton sx={{ color: "#ff4b7b" }} component={Link} to="/cart"> {/* Light pink for cart icon */}
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </WhiteAppBar>

      <Dialog
        open={loginDialogOpen}
        onClose={handleLoginClose}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '15px',
            padding: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center', padding: "0 !important" }}>
          Đăng nhập
        </DialogTitle>
        <DialogContent sx={{ padding: "0 !important" }}>
          <TextField
            autoFocus
            margin="dense"
            label="Tên đăng nhập"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Mật khẩu"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ padding: "0 !important" }}>
          <Button fullWidth onClick={handleLoginClose} variant="contained" color="primary">
            Đăng nhập
          </Button>
        </DialogActions>
      </Dialog>

      <ContentContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </ContentContainer>

    </MainContainer>
  );
};

export default PortalModule;
