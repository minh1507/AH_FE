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
import { useRecoilState } from 'recoil';
import { cartState } from './state';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@mui/icons-material';

const Cart = () => {
  // Fake data for cart items
  const [carts, setCarts] = useRecoilState<any[]>(cartState);
  const navigate = useNavigate()

  const getTotalPrice = () => {
    return carts.reduce((total, item) => total + (item.price * item.count), 0);
  };

  const deleted = (id: number) => {
    const updatedCarts = carts.filter((item) => item.id !== id);
    setCarts(updatedCarts);
  }

  const navigations = (id: number) => {
    navigate("/detail/"+id)
  }

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', mt: 4 }}>
      {carts.length === 0 ? (
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
            {carts.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  {/* Product image on the left */}
                  <CardMedia
                    component="img"
                    sx={{ width: 200 }} // Adjust the width for the image
                    image={item.imageURL}
                    alt={item.name}
                  />

                  {/* Product details on the right */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                        {item.newPrice.toLocaleString('vi-VN')} VND
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {item.description}
                      </Typography>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'space-between', paddingX: 2 }}>
                      <Button size="small" color="primary" onClick={() => navigations(item.id)}>
                        Xem chi tiết
                      </Button>
                      <IconButton onClick={() => deleted(item.id)} edge="end" aria-label="delete" sx={{ color: 'red' }}>
                        <DeleteIcon/>
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
