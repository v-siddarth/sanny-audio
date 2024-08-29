import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import emptyCart from "../../../assets/cartimg.png";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { addToCart, removeAllFromCart, removeFromCart } from '../../../redux/userSlice';
import { BasicButton, LightPurpleButton } from '../../../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import { updateCustomer } from '../../../redux/userHandle';

const Cart = ({ setIsCartOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    let cartDetails = currentUser.cartDetails;

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveAllFromCart = () => {
        dispatch(removeAllFromCart());
    };

    const totalQuantity = cartDetails.reduce((total, item) => total + item.quantity, 0);
    const totalOGPrice = cartDetails.reduce((total, item) => total + (item.quantity * item.price.mrp), 0);
    const totalNewPrice = cartDetails.reduce((total, item) => total + (item.quantity * item.price.cost), 0);

    const productViewHandler = (productID) => {
        navigate("/product/view/" + productID);
        setIsCartOpen(false);
    };

    const productBuyingHandler = (id) => {
        dispatch(updateCustomer(currentUser, currentUser._id));
        setIsCartOpen(false);
        navigate(`/product/buy/${id}`);
    };

    const allProductsBuyingHandler = () => {
        dispatch(updateCustomer(currentUser, currentUser._id));
        setIsCartOpen(false);
        navigate("/Checkout");
    };

    const priceContainerRef = useRef(null);

    const handleScrollToBottom = () => {
        if (priceContainerRef.current) {
            priceContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const firstCartItemRef = useRef(null);

    const handleScrollToTop = () => {
        if (firstCartItemRef.current) {
            firstCartItemRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <StyledContainer>
            <TopContainer>
                <LightPurpleButton onClick={() => setIsCartOpen(false)} style={{ backgroundColor: "#080a43" }}>
                    <KeyboardDoubleArrowLeftIcon /> Continue Shopping
                </LightPurpleButton>
                {cartDetails.length > 0 && (
                    <IconButton sx={{ backgroundColor: "#3a3939", color: "white" }} onClick={handleScrollToTop}>
                        <KeyboardDoubleArrowUpIcon />
                    </IconButton>
                )}
            </TopContainer>
            {cartDetails.length === 0 ? (
                <EmptyCartContainer>
                    <CartImage src={emptyCart} alt="Empty Cart" />
                    <Typography variant="h6">Your cart is empty</Typography>
                </EmptyCartContainer>
            ) : (
                <>
                    <GridContainer container spacing={2}>
                        <Grid item xs={12}>
                            {cartDetails.map((data, index) => (
                                <CartItem key={index} ref={index === 0 ? firstCartItemRef : null}>
                                    <ProductImage src={data.productImage} />
                                    <ProductDetails>
                                        <Typography variant="h6" component="div">
                                            {data.productName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Original Price: ₹{data.price.mrp}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Discount: {data.price.discountPercent}% Off
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Final Price: ₹{data.price.cost}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Quantity: {data.quantity}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Total: ₹{data.quantity * data.price.cost}
                                        </Typography>
                                        <ButtonContainer>
                                            <Button variant="outlined" color="error" onClick={() => handleRemoveFromCart(data)}>
                                                -1
                                            </Button>
                                            <Button variant="outlined" color="success" onClick={() => handleAddToCart(data)}>
                                                +1
                                            </Button>
                                        </ButtonContainer>
                                        <ButtonContainer>
                                            <BasicButton onClick={() => productViewHandler(data._id)}>
                                                View
                                            </BasicButton>
                                            <Button variant="contained" color="success" onClick={() => productBuyingHandler(data._id)}>
                                                Buy
                                            </Button>
                                        </ButtonContainer>
                                    </ProductDetails>
                                </CartItem>
                            ))}
                        </Grid>
                    </GridContainer>
                    <PriceDetailsContainer ref={priceContainerRef}>
                        <StyledPaper>
                            <Title>PRICE DETAILS</Title>
                            <Divider sx={{ my: 1 }} />
                            <DetailsContainer>
                                Price ({totalQuantity} items) = ₹{totalOGPrice}
                                <br /><br />
                                Discount = ₹{totalOGPrice - totalNewPrice}
                                <Divider sx={{ my: 1 }} />
                                Total Amount = ₹{totalNewPrice}
                            </DetailsContainer>
                            <Divider sx={{ my: 1, mb: 4 }} />
                            {cartDetails.length > 0 && (
                                <Button variant="contained" color="success" onClick={allProductsBuyingHandler}>
                                    Buy All
                                </Button>
                            )}
                        </StyledPaper>
                    </PriceDetailsContainer>
                </>
            )}
            {cartDetails.length > 0 && (
                <BottomContainer>
                    <Button variant="contained" color="success" onClick={handleScrollToBottom}>
                        View Bill
                    </Button>
                    <Button variant="contained" color="error" onClick={handleRemoveAllFromCart}>
                        Remove All
                    </Button>
                </BottomContainer>
            )}
        </StyledContainer>
    );
};

export default Cart;

// Styled Components

const StyledContainer = styled(Container)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1;
`;

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GridContainer = styled(Grid)`
  width: 100%;
  max-width: 1200px;
`;

const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: bold;
`;

const DetailsContainer = styled.div`
  margin-top: 1rem;
  font-size: 16px;
`;

const CartItem = styled(Paper)`
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
`;

const CartImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  width: 100px;
  height: auto;
  margin-right: 16px;
`;

const ProductDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const PriceDetailsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

