import React, { useEffect, useState } from "react";
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
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useTitle } from "../../hook/title/title";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ProductService } from "../../service/product";
import { useRecoilState } from "recoil";
import { cartState } from "../cart/state";
import { BuyService } from "../../service/buy";
import useToast from "../../hook/toast/toast";

const Detail = () => {
  const [product, setProduct] = useState<any>();
  const [carts, setCarts] = useRecoilState<any[]>(cartState);
  const [quantity, setQuantity] = useState<number>(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // Popup state
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: ""
  });
  const { showToast } = useToast();

  const { id } = useParams();
  useTitle("Xem chi tiết");

  const navigate = useNavigate();

  useEffect(() => {
    findAll();
  }, []);

  const findAll = async () => {
    const product = await ProductService.findOne(Number(id));
    setProduct(product);
  };

  const handleCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const elementIndex = carts.findIndex((i: any) => i.id === id);

    if (elementIndex !== -1) {
      const updatedCarts = [...carts];
      const updatedProduct = {
        ...updatedCarts[elementIndex],
        count: updatedCarts[elementIndex].count + quantity,
      };
      updatedCarts[elementIndex] = updatedProduct;
      setCarts(updatedCarts);
    } else {
      setCarts([...carts, { ...product, id: id, count: quantity }]);
    }

    showToast("Thêm vào giỏ hàng thành công", 'success');
  };

  const formatPrice = (price: any) => {
    return price.toLocaleString("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    BuyService.create({
      productId: id,
      name: customerInfo.name,
      address: customerInfo.address,
      phone: customerInfo.phone,
      quantity: '1'
    })
    setOpenDialog(false); 
    showToast("Mua hàng thành công, xin chờ liên hệ", 'success');
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "white", boxShadow: 2 }}>
            <CardContent>
              {!imageLoaded && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={300}
                  sx={{ borderRadius: 2 }}
                />
              )}
              <Box
                component="img"
                src={product && product.imageURL}
                alt={product && product.name}
                width="100%"
                sx={{
                  borderRadius: 2,
                  objectFit: "cover",
                  display: imageLoaded ? "block" : "none",
                }}
                onLoad={handleImageLoad}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "white", boxShadow: 2 }}>
            <CardContent>
              <Typography
                gutterBottom
                sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}
              >
                {product && product.title}
              </Typography>
              <Typography
                sx={{
                  mt: "10px !important",
                  color: "#ff4b7b",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                {product && formatPrice(product.newPrice)}₫
              </Typography>
              <Typography
                sx={{
                  textDecoration: "line-through",
                  color: "grey",
                  mb: 1,
                  fontSize: "0.8rem",
                }}
              >
                {product && formatPrice(product.oldPrice)}₫
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  mt: "10px !important",
                  lineHeight: 1.5,
                  color: "#555",
                }}
              >
                Thông tin chi tiết:
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: "3px !important", lineHeight: 1.5, color: "#555" }}
              >
                {product && product.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Box: Purchase Options */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "white", boxShadow: 2, p: 2 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  mt: 1,
                }}
              >
                <TextField
                  label="Số lượng"
                  type="number"
                  variant="outlined"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  InputProps={{
                    inputProps: { min: 1 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <ShoppingCartIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Nhập số lượng từ 1 trở lên"
                  sx={{ mb: 2, width: "100%" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1, width: "100%" }}
                  onClick={handleDialogOpen}
                >
                  Mua ngay
                </Button>
                <Button
                  onClick={(e) => handleCart(e)}
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 1, width: "100%" }}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog for Customer Information */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth>
        <DialogTitle>Thông tin khách hàng</DialogTitle>
        <DialogContent>
          <TextField
            label="Họ và tên"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={customerInfo.name}
            onChange={handleCustomerInfoChange}
          />
          <TextField
            label="Địa chỉ"
            variant="outlined"
            fullWidth
            margin="normal"
            name="address"
            value={customerInfo.address}
            onChange={handleCustomerInfoChange}
          />
           <TextField
            label="Điện thoại"
            variant="outlined"
            fullWidth
            margin="normal"
            name="phone"
            value={customerInfo.phone}
            onChange={handleCustomerInfoChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Detail;
