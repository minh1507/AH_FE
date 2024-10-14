// src/components/cart/Cart.js
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Grid,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Cart = () => {
  // Fake data for cart items
  const cartItems = [
    {
      id: 1,
      name: "Đầm Đen",
      price: 100000, // Stored as a number
      originalPrice: 150000, // Original price for showing discount
      description: "Đầm đen sang trọng, phù hợp cho các buổi tiệc.",
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rccz-lsgoc1ju42zh96.webp",
    },
    {
      id: 2,
      name: "Áo Trắng",
      price: 200000,
      originalPrice: 250000,
      description: "Áo trắng thanh lịch, chất liệu cotton thoáng mát.",
      image: "https://via.placeholder.com/150", // Placeholder image
    },
  ];

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', mt: 4 }}>
      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Hiện tại giỏ hàng của bạn đang trống.
          </Typography>
          <Button variant="contained" color="primary" href="/">
            Mua sắm ngay
          </Button>
        </Box>
      ) : (
        <>
          {/* Cart items grid layout */}
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  {/* Product image on the left */}
                  <CardMedia
                    component="img"
                    sx={{ width: 200 }} // Adjust the width for the image
                    image={item.image}
                    alt={item.name}
                  />

                  {/* Product details on the right */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        {item.name}
                      </Typography>
                      {item.price < item.originalPrice && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: 'line-through' }}
                        >
                          {item.originalPrice.toLocaleString('vi-VN')} VND
                        </Typography>
                      )}
                      <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                        {item.price.toLocaleString('vi-VN')} VND
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {item.description}
                      </Typography>
                    </CardContent>

                    {/* Card actions for delete and other actions */}
                    <CardActions sx={{ justifyContent: 'space-between', paddingX: 2 }}>
                      <Button size="small" color="primary" href="/detail">
                        Xem chi tiết
                      </Button>
                      <IconButton edge="end" aria-label="delete" sx={{ color: 'red' }}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Total price and checkout button */}
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3,
              px: 2,
            }}
          >
            <Typography variant="h6">Tổng cộng: {getTotalPrice().toLocaleString('vi-VN')} VND</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartCheckoutIcon />}
              size="large"
              sx={{ textTransform: 'none' }}
            >
              Thanh toán
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
