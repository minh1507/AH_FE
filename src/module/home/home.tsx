import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useTitle } from "../../hook/title/title";
import { styled } from "@mui/system";
import WatchIcon from "@mui/icons-material/Watch";
import Carousel from "react-material-ui-carousel"; // Import Carousel
import { Paper as CarouselPaper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import Left Arrow Icon
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Import Right Arrow Icon

const Sidebar = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffe4e9",
  padding: theme.spacing(3),
  borderRadius: "10px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  height: "100%",
}));

const CategoryListItem = styled(ListItem)(({ theme }) => ({
  transition: "background-color 0.3s ease",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: "#ffb3c6",
  },
}));

const ProductCard = styled(Paper)(({ theme }) => ({
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const ProductLabel = styled(Box, {
  shouldForwardProp: (prop) => prop !== "labelType", // Prevent labelType from being forwarded
})(({ theme, labelType }) => ({
  position: "absolute",
  top: "10px",
  left: "10px",
  padding: "4px 8px",
  backgroundColor: labelType === "new" ? "#4caf50" : labelType === "sale" ? "#ff9800" : "#2196f3",
  color: "white",
  borderRadius: "5px",
  fontSize: "12px",
}));

const CategoryPin = styled(Typography)(({ theme, color }) => ({
  backgroundColor: color, // Set the background color based on the prop
  color: "white",
  padding: "4px 12px", // Adjusted padding for a better shape
  borderRadius: "20px", // Increased border radius for a bean-like shape
  fontSize: "12px",
  marginBottom: "12px !important", // Space below the category pin
  width: "fit-content", // Changed from 'auto' to 'fit-content'
  display: 'inline-block', // Ensure it only takes as much width as needed
}));

const OriginalPrice = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  textDecoration: "line-through",
  color: "grey",
}));

const Price = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "bold",
  color: "#ff4b7b",
  marginTop: "10px",
}));

// Slideshow items
const slides = [
  {
    image: "https://cf.shopee.vn/file/sg-11134258-7rdx2-m0wtplzv4ypw68_xxhdpi",
    alt: "Slide 1",
  },
  {
    image: "https://cf.shopee.vn/file/sg-11134258-7rdx2-m0wtplzv4ypw68_xxhdpi",
    alt: "Slide 2",
  },
  {
    image: "https://cf.shopee.vn/file/sg-11134258-7rdx2-m0wtplzv4ypw68_xxhdpi",
    alt: "Slide 3",
  },
];

const Home = () => {
  useTitle("Home");

  // Array of category names
  const categories = [
    { name: "Váy", icon: <WatchIcon style={{ color: "#ff4b7b" }} /> },
    { name: "Quần", icon: <WatchIcon style={{ color: "#ff4b7b" }} /> },
    { name: "Áo", icon: <WatchIcon style={{ color: "#ff4b7b" }} /> },
  ];

  // Array of colors for the category pins
  const colors = [
    "#4caf50", // Green
    "#ff9800", // Orange
    "#2196f3", // Blue
    "#9c27b0", // Purple
    "#3f51b5", // Dark Blue
    "#00bcd4", // Cyan
  ];

  // Function to assign a random color to each category
  const assignRandomColorToCategories = (categories) => {
    return categories.map(category => ({
      ...category,
      color: colors[Math.floor(Math.random() * colors.length)], 
    }));
  };

  // Get categories with random colors
  const categoriesWithColors = assignRandomColorToCategories(categories);

  return (
    <div>
      <Box sx={{ my: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Slideshow and banners */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Carousel
                    indicators={false}
                    navButtonsAlwaysVisible
                    NextIcon={<ArrowForwardIcon />}
                    PrevIcon={<ArrowBackIcon />}
                  >
                    {slides.map((slide, index) => (
                      <CarouselPaper key={index}>
                        <img
                          src={slide.image}
                          alt={slide.alt}
                          width="100%"
                          style={{ height: "300px", objectFit: "cover" }}
                        />
                      </CarouselPaper>
                    ))}
                  </Carousel>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Paper>
                        <img
                          src="https://cf.shopee.vn/file/sg-11134258-7rdx2-m0wtplzv4ypw68_xxhdpi" 
                          alt="Banner 1"
                          width="100%"
                          style={{ height: "150px", objectFit: "cover" }}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper>
                        <img
                          src="https://cf.shopee.vn/file/sg-11134258-7rdx2-m0wtplzv4ypw68_xxhdpi" 
                          alt="Banner 2"
                          width="100%"
                          style={{ height: "150px", objectFit: "cover" }}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Sidebar for categories */}
            <Grid item xs={12} md={3}>
              <Sidebar sx={{ height: "auto" }}>
                <Typography variant="h6" gutterBottom>
                  Danh mục
                </Typography>
                <List>
                  {categoriesWithColors.map((category, index) => (
                    <CategoryListItem key={index}>
                      <ListItemIcon>
                        {category.icon}
                      </ListItemIcon>
                      <ListItemText primary={category.name} />
                    </CategoryListItem>
                  ))}
                </List>
              </Sidebar>
            </Grid>

            {/* Main grid view for products */}
            <Grid item xs={12} md={9}>
              <Grid container spacing={3}>
                {Array.from(Array(40).keys()).map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                    <ProductCard>
                      <img
                        src="https://down-vn.img.susercontent.com/file/sg-11134201-7rccz-lsgoc1ju42zh96.webp"
                        alt="Product"
                        width="100%"
                        style={{ height: "150px", objectFit: "contain", borderRadius: "10px", marginBottom: "10px" }}
                      />
                      <Typography variant="h6" gutterBottom>
                        Đầm đen
                      </Typography>
                      <CategoryPin color={categoriesWithColors[item % categoriesWithColors.length].color}>
                        Váy
                      </CategoryPin>
                      <Price variant="body1">100,000 VNĐ</Price>
                      <OriginalPrice variant="body2">150,000 VNĐ</OriginalPrice>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: "auto", backgroundColor: "#ff4b7b", marginTop: "7px"}}
                      >
                        Giỏ hàng
                      </Button>
                    </ProductCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
