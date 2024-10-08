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
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { useTitle } from "../../hook/title/title";
import { styled, useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import WatchIcon from "@mui/icons-material/Watch";
import Carousel from "react-material-ui-carousel";
import { Paper as CarouselPaper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const Sidebar = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(3),
  borderRadius: "10px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  height: "calc(100% - 24px)", // Adjust height for margins
  position: "sticky", // Sticky positioning
  top: "24px", // Sticks to the top
  zIndex: 1000, // Ensures it appears on top of other elements
  overflowY: "auto", // Enable vertical scrolling
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const CategoryListItem = styled(ListItem)(({ theme }) => ({
  transition: "background-color 0.3s ease",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#ffe6ea",
  },
}));

const CompanyCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
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
  useTitle("Trang chủ");
  const navigate = useNavigate();

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
        <Container maxWidth="xl" sx={{ padding: "0 !important" }}>
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

            {/* Menu Bar below the Banner and Slideshow */}
            {!isMobile && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    padding: theme.spacing(2),
                    borderRadius: "10px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "left",
                    marginY: theme.spacing(2),
                  }}
                >
                  <Button
                    variant="text"
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#ffe6ea",
                      },
                    }}
                  >
                    Gia đình
                  </Button>
                  <Button
                    variant="text"
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#ffe6ea",
                      },
                    }}
                  >
                    Bãi biển
                  </Button>
                  <Button
                    variant="text"
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#ffe6ea",
                      },
                    }}>
                    Công sở
                  </Button>
                  <Button
                    variant="text"
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#ffe6ea",
                      },
                    }}>
                    Tiệc tùng
                  </Button>
                </Box>
              </Grid>
            )}


            {/* Conditionally render the category sidebar only for non-mobile views */}
            {!isMobile && (
              <Grid item xs={12} md={3}>
                <Sidebar sx={{ height: "auto" }}>
                  <Typography gutterBottom>Danh mục</Typography>
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
            <Card sx={{ backgroundColor: 'white', boxShadow: 2, mb: 2 }}>
                <CardContent>
                  <Typography sx={{margin: "0 !important"}} gutterBottom variant="h6" component="div">
                    Bán chạy
                  </Typography>
                  {/* You can add more content here if needed */}
                </CardContent>
              </Card>

              <Grid
                container
                spacing={isMobile ? 2 : 3}
              >
                {Array.from(Array(12).keys()).map((productId) => (
                  <Grid item xs={12} sm={6} md={3} lg={2} key={productId}>
                    <ProductCard
                      onClick={() => navigate(`/detail/${productId}`)}
                      style={{
                        cursor: "pointer",
                        width: isMobile ? "100%" : "auto", // Set width to 100% in mobile view
                      }}
                    >
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
                      <Typography sx={{ marginBottom: "10px !important" }} gutterBottom>
                        Đầm đen
                      </Typography>
                      <Price variant="body1">100,000 VNĐ</Price>
                      <OriginalPrice variant="body2">150,000 VNĐ</OriginalPrice>
                    </ProductCard>
                  </Grid>
                ))}
              </Grid>

              <Card sx={{ backgroundColor: 'white', boxShadow: 2, mb: 2, mt: 2 }}>
                <CardContent>
                  <Typography sx={{margin: "0 !important"}} gutterBottom variant="h6" component="div">
                    Xu hướng
                  </Typography>
                  {/* You can add more content here if needed */}
                </CardContent>
              </Card>

              <Grid
                container
                spacing={isMobile ? 2 : 3}
              >
                {Array.from(Array(12).keys()).map((productId) => (
                  <Grid item xs={12} sm={6} md={3} lg={2} key={productId}>
                    <ProductCard
                      onClick={() => navigate(`/detail/${productId}`)}
                      style={{
                        cursor: "pointer",
                        width: isMobile ? "100%" : "auto", // Set width to 100% in mobile view
                      }}
                    >
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
                      <Typography sx={{ marginBottom: "10px !important" }} gutterBottom>
                        Đầm đen
                      </Typography>
                      <Price variant="body1">100,000 VNĐ</Price>
                      <OriginalPrice variant="body2">150,000 VNĐ</OriginalPrice>
                    </ProductCard>
                  </Grid>
                ))}
              </Grid>

              <Card sx={{ backgroundColor: 'white', boxShadow: 2, mb: 2, mt: 2 }}>
                <CardContent>
                  <Typography sx={{margin: "0 !important"}} gutterBottom variant="h6" component="div">
                    Phổ biến
                  </Typography>
                  {/* You can add more content here if needed */}
                </CardContent>
              </Card>

              <Grid
                container
                spacing={isMobile ? 2 : 3}
              >
                {Array.from(Array(12).keys()).map((productId) => (
                  <Grid item xs={12} sm={6} md={3} lg={2} key={productId}>
                    <ProductCard
                      onClick={() => navigate(`/detail/${productId}`)}
                      style={{
                        cursor: "pointer",
                        width: isMobile ? "100%" : "auto", // Set width to 100% in mobile view
                      }}
                    >
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
                      <Typography sx={{ marginBottom: "10px !important" }} gutterBottom>
                        Đầm đen
                      </Typography>
                      <Price variant="body1">100,000 VNĐ</Price>
                      <OriginalPrice variant="body2">150,000 VNĐ</OriginalPrice>
                    </ProductCard>
                  </Grid>
                ))}
              </Grid>

              <CompanyCard>
                <Typography sx={{ fontSize: "1.1rem" }} gutterBottom>
                  Công ty THHH An Hoàng
                </Typography>
                <Typography sx={{ fontSize: "0.9rem" }} variant="body1" gutterBottom>
                  Tòa nhà số 1 đường ..., quận ..., thành phố Hà Nội
                </Typography>
                <Typography sx={{ fontSize: "0.9rem" }} variant="body1">
                  Hotline: ...
                </Typography>

                <Divider sx={{ marginY: 2 }} />

                <Typography sx={{ fontSize: "1.1rem" }} gutterBottom>
                  Thương Hiệu Nổi Bật
                </Typography>
                <Typography sx={{ fontSize: "0.9rem" }} variant="body1" gutterBottom>
                  vascara
                  /
                  dior
                  /
                  esteelauder
                  /
                  th truemilk
                  /
                  barbie
                  /
                  owen
                  /
                  ensure
                  /
                  durex
                  /
                  bioderma
                  /
                  elly
                  /
                  milo
                  /
                  skechers
                  /
                  aldo
                  /
                  triumph
                  /
                  nutifood
                  /
                  kindle
                  /
                  nerman
                  /
                  wacom
                  /
                  anessa
                  /
                  yoosee
                  /
                  olay
                  /
                  similac
                  /
                  comfort
                  /
                  bitas
                  /
                  shiseido
                  /
                  langfarm
                  /
                  hukan
                  /
                  vichy
                  /
                  fila
                  /
                  tsubaki

                </Typography>
              </CompanyCard>



            </Grid>
          </Grid>


        </Container>
      </Box>
    </div>
  );
};

export default Home;
