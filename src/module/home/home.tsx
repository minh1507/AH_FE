import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Divider,
  Skeleton,
} from "@mui/material";
import { useTitle } from "../../hook/title/title";
import { styled, useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import im from "../../assets/download.jfif";
import { CategoryService } from "../../service/category";
import { ProductService } from "../../service/product";

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

const Home = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setproducts] = useState<any[]>([]);
  const [cat, setcat] = useState<any>();
  const [imageLoaded, setImageLoaded] = useState<any>({});

  useTitle("Trang chủ");
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    findAll();
  }, []);

  const findAll = async () => {
    const categories = await CategoryService.findAll();
    const products = await ProductService.findAll(categories[0]?.id);
    setCategories(categories);
    setproducts(products);
  };

  const handleCat = async (id: any) => {
    const products = await ProductService.findAll(id);
    setproducts(products);
  };

  const formatPrice = (price: any) => {
    return price.toLocaleString("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const handleImageLoad = (productId: string) => {
    setImageLoaded((prevState: any) => ({
      ...prevState,
      [productId]: true,
    }));
  };

  return (
    <div>
      <Box sx={{ my: 3 }} sx={{ padding: "0 !important" }}>
        <Grid item xs={12} sx={{ padding: "0 !important" }}>
          <Paper>
            <img
              src={im}
              alt="Banner 2"
              width="100%"
              style={{ height: "auto", objectFit: "cover" }}
            />
          </Paper>
        </Grid>
        <Container maxWidth="lg" sx={{ padding: "0 !important" }}>
          <Grid container spacing={3}>
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
                      key={prop.id}
                      variant="text"
                      sx={{
                        color: "black",
                        "&:hover": {
                          backgroundColor: "#ffe6ea",
                        },
                      }}
                      onClick={() => handleCat(prop.id)}
                    >
                      {prop.name}
                    </Button>
                  ))}
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <Grid container spacing={isMobile ? 2 : 3}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard
                      onClick={() => navigate(`/detail/${product.id}`)}
                      style={{
                        cursor: "pointer",
                        width: isMobile ? "100%" : "auto", // Set width to 100% in mobile view
                      }}
                    >
                      {!imageLoaded[product.id] && (
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={150}
                          sx={{ borderRadius: "10px", marginBottom: "10px" }}
                        />
                      )}
                      <img
                        src={product.imageURL}
                        alt="Product"
                        width="100%"
                        style={{
                          height: "150px",
                          objectFit: "contain",
                          borderRadius: "10px",
                          marginBottom: "10px",
                          display: imageLoaded[product.id] ? "block" : "none",
                        }}
                        onLoad={() => handleImageLoad(product.id)}
                      />
                      <Typography sx={{ marginBottom: "10px !important" }} gutterBottom>
                        {product.title}
                      </Typography>
                      <Price variant="body1">{formatPrice(product.newPrice)} VNĐ</Price>
                      <OriginalPrice variant="body2">{formatPrice(product.oldPrice)} VNĐ</OriginalPrice>
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
                  vascara / dior / esteelauder / th truemilk / barbie / owen / ensure /
                  durex / bioderma / elly / milo / skechers / aldo / triumph / nutifood /
                  kindle / nerman / wacom / anessa / yoosee / olay / similac / comfort /
                  bitas / shiseido / langfarm / hukan / vichy / fila / tsubaki
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
