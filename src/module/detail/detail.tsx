import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite'; // Optional: Add a favorite icon for better UI

const Detail = () => {
  const { id } = useParams();

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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            width="100%"
            sx={{
              borderRadius: 2,
              boxShadow: 2,
              objectFit: "cover",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            {product.name}
          </Typography>
          <Typography variant="h6" sx={{ textDecoration: "line-through", color: "grey", mb: 1 }}>
            {product.originalPrice}
          </Typography>
          <Typography variant="h5" sx={{ color: "#ff4b7b", fontWeight: "bold", mb: 2 }}>
            {product.price}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, lineHeight: 1.5, color: '#555' }}>
            {product.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ flexGrow: 1, mr: 1 }}
            >
              Thêm vào giỏ hàng
            </Button>
            <IconButton aria-label="add to favorites" color="secondary">
              <FavoriteIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Detail;
