import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { useTitle } from "../../hook/title/title";
import { styled, useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import Carousel from "react-material-ui-carousel";
import { Paper as CarouselPaper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { CategoryService } from "../../service/category";

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
  const [categories, setCategories] = useState([])

  useTitle("Trang chủ");
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    findAll()
  }, []);

  const findAll = async () => {
    const categories = await CategoryService.findAll()
    setCategories(categories)
  }

  return (
    <div>
      <Box sx={{ my: 3 }}>
        <Container maxWidth="lg" sx={{ padding: "0 !important" }}>
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
                  {categories.map((prop) => (
                    <Button
                    variant="text"
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#ffe6ea",
                      },
                    }}
                  >
                    {prop.name}
                  </Button>
                  ))}
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <Grid
                container
                spacing={isMobile ? 2 : 3}
              >
                {Array.from(Array(12).keys()).map((productId) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={productId}>
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
