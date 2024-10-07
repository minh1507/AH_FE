import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite'; // Optional: Add a favorite icon for better UI
import { useTitle } from "../../hook/title/title";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled, useTheme } from "@mui/system";

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

const Detail = () => {
  const { id } = useParams();
  useTitle("Xem chi tiết");

  const navigate = useNavigate();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  // Sample product data, replace with your actual data fetching logic
  const product = {
    id,
    name: "Đầm Đen",
    price: "100,000 VNĐ",
    originalPrice: "150,000 VNĐ",
    description: "Đầm đen sang trọng, phù hợp cho các buổi tiệc.",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rccz-lsgoc1ju42zh96.webp",
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Left Box: Image */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: 'white', boxShadow: 2 }}>
            <CardContent>
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                width="100%"
                sx={{
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Middle Box: Product Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: 'white', boxShadow: 2 }}>
            <CardContent>
              <Typography gutterBottom sx={{ fontSize: "1.5rem", fontWeight: 'bold', color: '#333' }}>
                {product.name}
              </Typography>
              <Typography sx={{ mt: "10px !important", color: "#ff4b7b", fontWeight: "bold", mb: 2 }}>
                {product.price}
              </Typography>
              <Typography sx={{ textDecoration: "line-through", color: "grey", mb: 1, fontSize: "0.8rem" }}>
                {product.originalPrice}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.2rem", mt: "10px !important", lineHeight: 1.5, color: '#555' }}>
                Thông tin về sản phẩm:
              </Typography>
              <Typography variant="body1" sx={{ mt: "3px !important", lineHeight: 1.5, color: '#555' }}>
                {product.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat veritatis nemo nesciunt unde corporis veniam, molestiae tenetur voluptatem quod accusantium. Iure et quasi qui placeat soluta minus quam temporibus tenetur?
              </Typography>
            </CardContent>
          </Card>

          {/* Relevant Products */}
          <Typography variant="h6" sx={{ mt: 3, fontWeight: 'bold', color: '#333' }}>
            Sản phẩm liên quan
          </Typography>
          <Grid item xs={12}>
            <Grid
              container
              spacing={isMobile ? 2 : 3}  // Adjust spacing based on mobile or desktop
            >
              {Array.from(Array(8).keys()).map((productId) => (
                <Grid item xs={12} sm={12} md={4} lg={3} key={productId}>  {/* Responsive grid settings */}
                  <ProductCard
                    onClick={() => navigate(`/detail/${productId}`)}  // Click to navigate to product detail page
                    style={{
                      cursor: "pointer",
                      width: isMobile ? "100%" : "auto",  // 100% width in mobile view
                    }}
                  >
                    <img
                      src="https://down-vn.img.susercontent.com/file/sg-11134201-7rccz-lsgoc1ju42zh96.webp"  // Product image
                      alt="Product"
                      width="100%"
                      style={{
                        height: "150px",  // Fixed height for consistent display
                        objectFit: "contain",  // Ensure image fits well without being cropped
                        borderRadius: "10px",  // Rounded corners for images
                        marginBottom: "10px",  // Spacing between image and text
                      }}
                    />
                    <Typography sx={{ marginBottom: "10px !important" }} gutterBottom>
                      Đầm đen  {/* Product name */}
                    </Typography>
                    <Price variant="body1">100,000 VNĐ</Price>  {/* Price with bold styling */}
                    <OriginalPrice variant="body2" sx={{ textDecoration: "line-through", color: 'grey' }}>
                      150,000 VNĐ  {/* Original price with strike-through */}
                    </OriginalPrice>
                  </ProductCard>
                </Grid>
              ))}
            </Grid>
          </Grid>

        </Grid>


        {/* Right Box: Purchase Options */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: 'white', boxShadow: 2, p: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 1 }}>
                <TextField
                  label="Số lượng"
                  type="number"
                  variant="outlined"
                  InputProps={{
                    inputProps: { min: 1 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <ShoppingCartIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Nhập số lượng từ 1 trở lên"
                  sx={{ mb: 2, width: '100%' }}
                />
                <Button variant="contained" color="primary" sx={{ mt: 1, width: '100%' }}>
                  Mua ngay
                </Button>
                <Button variant="outlined" color="primary" sx={{ mt: 1, width: '100%' }}>
                  Thêm vào giỏ hàng
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
};

export default Detail;
