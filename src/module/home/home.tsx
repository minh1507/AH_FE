import React from "react";
import {
  Box,
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
import { styled, useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import WatchIcon from "@mui/icons-material/Watch";
import Carousel from "react-material-ui-carousel"; 
import { Paper as CarouselPaper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Sidebar = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffe4e9",
  padding: theme.spacing(3),
  borderRadius: "10px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  height: "100%",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
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
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
}));

const CategoryPin = styled(Typography)(({ theme, color }) => ({
  backgroundColor: color, 
  color: "white",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  marginBottom: "12px !important",
  width: "fit-content", 
  display: "inline-block",
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

  const categories = [
    { name: "Váy", icon: <WatchIcon style={{ color: "#ff4b7b" }} /> },
    { name: "Quần", icon: <WatchIcon style={{ color: "#ff4b7b" }} /> },
    { name: "Áo", icon: <WatchIcon style={{ color: "#ff4b7b" }} /> },
  ];

  const colors = [
    "#4caf50", 
    "#ff9800", 
    "#2196f3", 
    "#9c27b0", 
    "#3f51b5", 
    "#00bcd4", 
  ];

  const assignRandomColorToCategories = (categories) => {
    return categories.map((category) => ({
      ...category,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  };

  const categoriesWithColors = assignRandomColorToCategories(categories);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Box sx={{ my: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
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
                          style={{
                            height: isMobile ? "200px" : "300px",
                            objectFit: "cover",
                          }}
                        />
                      </CarouselPaper>
                    ))}
                  </Carousel>
                </Grid>
                {!isMobile && (
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
                )}
              </Grid>
            </Grid>

            {/* Conditionally render the category sidebar only for non-mobile views */}
            {!isMobile && (
              <Grid item xs={12} md={3}>
                <Sidebar sx={{ height: "auto" }}>
                  <Typography variant="h6" gutterBottom>
                    Danh mục
                  </Typography>
                  <List>
                    {categoriesWithColors.map((category, index) => (
                      <CategoryListItem key={index}>
                        <ListItemIcon>{category.icon}</ListItemIcon>
                        <ListItemText primary={category.name} />
                      </CategoryListItem>
                    ))}
                  </List>
                </Sidebar>
              </Grid>
            )}

            {/* Main grid view for products */}
            <Grid item xs={12} md={isMobile ? 12 : 9}>
              <Grid container spacing={isMobile ? 2 : 3}>
                {Array.from(Array(40).keys()).map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                    <ProductCard>
                      <img
                        src="https://down-vn.img.susercontent.com/file/sg-11134201-7rccz-lsgoc1ju42zh96.webp"
                        alt="Product"
                        width="100%"
                        style={{
                          height: "150px",
                          objectFit: "contain",
                          borderRadius: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <Typography variant="h6" gutterBottom>
                        Đầm đen
                      </Typography>
                      <CategoryPin
                        color={
                          categoriesWithColors[item % categoriesWithColors.length]
                            .color
                        }
                      >
                        Váy
                      </CategoryPin>
                      <Price variant="body1">100,000 VNĐ</Price>
                      <OriginalPrice variant="body2">150,000 VNĐ</OriginalPrice>
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
