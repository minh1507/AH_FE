import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useRecoilState } from 'recoil';
import { cartState } from './state';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [carts, setCarts] = useRecoilState<any[]>(cartState);
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return carts.reduce((total, item) => total + (item.newPrice + item.oldPrice) * item.count, 0);
  };

  const getDiscountPrice = () => {
    return carts.reduce((total, item) => total + item.oldPrice * item.count, 0);
  };

  const deleted = (id: number) => {
    const updatedCarts = carts.filter((item) => item.id !== id);
    setCarts(updatedCarts);
  };

  const navigations = (id: number) => {
    navigate('/detail/' + id);
  };

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
        <Grid container spacing={3}>
          {/* Left Side: Cart Items Table */}
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Hình ảnh</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {carts.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img src={item.imageURL} alt={item.name} style={{ width: 80, height: 80 }} />
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{(item.newPrice + item.oldPrice).toLocaleString('vi-VN')} VND</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>
                        <Button size="small" color="primary" onClick={() => navigations(item.id)}>
                          Xem chi tiết
                        </Button>
                        <IconButton
                          onClick={() => deleted(item.id)}
                          edge="end"
                          aria-label="delete"
                          sx={{ color: 'red' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Right Side: Summary Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <CardContent sx={{ padding: "0 !important" }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">Tạm tính:</Typography>
                  <Typography variant="body1">{getTotalPrice().toLocaleString('vi-VN')} VND</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" color="text.secondary">
                    Giảm giá:
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {getDiscountPrice().toLocaleString('vi-VN')} VND
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography variant="h6" color="primary">
                    Tổng tiền:
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {(getTotalPrice() - getDiscountPrice()).toLocaleString('vi-VN')} VND
                  </Typography>
                </Box>

                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartCheckoutIcon />}
                  size="large"
                  fullWidth
                >
                  Mua hàng
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Cart;
