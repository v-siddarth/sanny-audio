import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import styled from 'styled-components';
import { BasicButton } from '../utils/buttonStyles';
import { getProductDetails, updateStuff } from '../redux/userHandle';
import { Avatar, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { generateRandomColor, timeAgo } from '../utils/helperFunctions';
import { MoreVert } from '@mui/icons-material';

const ViewProduct = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const productID = params.id;

    const { currentUser, currentRole, productDetails, loading, responseDetails } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getProductDetails(productID));
    }, [productID, dispatch]);

    const [anchorElMenu, setAnchorElMenu] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const deleteHandler = (reviewId) => {
        const fields = { reviewId };
        dispatch(updateStuff(fields, productID, "deleteProductReview"));
    };

    const reviewer = currentUser && currentUser._id;

    return (
        <>
            {loading ? (
                <LoadingContainer>Loading...</LoadingContainer>
            ) : (
                <>
                    {responseDetails ? (
                        <NotFoundContainer>Product not found</NotFoundContainer>
                    ) : (
                        <>
                            <Container>
                                <LeftColumn>
                                    <ProductImage
                                        src={productDetails?.productImage}
                                        alt={productDetails?.productName}
                                    />
                                </LeftColumn>
                                <RightColumn>
                                    <ProductInfo>
                                        <ProductName>{productDetails?.productName}</ProductName>
                                        <PriceContainer>
                                            <PriceCost>₹{productDetails?.price?.cost}</PriceCost>
                                            <PriceMrp>₹{productDetails?.price?.mrp}</PriceMrp>
                                            <PriceDiscount>{productDetails?.price?.discountPercent}% off</PriceDiscount>
                                        </PriceContainer>
                                        <Description>{productDetails?.description}</Description>
                                        <ProductDetails>
                                            <Typography>Category: {productDetails?.category}</Typography>
                                            <Typography>Subcategory: {productDetails?.subcategory}</Typography>
                                        </ProductDetails>
                                        {currentRole === "Customer" && (
                                            <AddToCartButton
                                                onClick={() => dispatch(addToCart(productDetails))}
                                            >
                                                Add to Cart
                                            </AddToCartButton>
                                        )}
                                    </ProductInfo>
                                </RightColumn>
                            </Container>

                            <ReviewsSection>
                                <Typography variant="h5">Customer Reviews</Typography>
                                {productDetails?.reviews?.length > 0 ? (
                                    <ReviewsContainer>
                                        {productDetails.reviews.map((review, index) => (
                                            <ReviewCard key={index}>
                                                <ReviewCardHeader>
                                                    <Avatar
                                                        sx={{
                                                            width: 50,
                                                            height: 50,
                                                            marginRight: 2,
                                                            backgroundColor: generateRandomColor(review._id),
                                                        }}
                                                    >
                                                        {review.reviewer.name.charAt(0)}
                                                    </Avatar>
                                                    <ReviewDetails>
                                                        <Typography variant="subtitle1">{review.reviewer.name}</Typography>
                                                        <Typography variant="caption">{timeAgo(review.date)}</Typography>
                                                    </ReviewDetails>
                                                    {review.reviewer._id === reviewer && (
                                                        <IconButton onClick={handleOpenMenu}>
                                                            <MoreVert />
                                                        </IconButton>
                                                    )}
                                                </ReviewCardHeader>
                                                <ReviewContent>
                                                    <Typography variant="body2">
                                                        Rating: {review.rating}
                                                    </Typography>
                                                    <Typography>{review.comment}</Typography>
                                                </ReviewContent>
                                                <Menu
                                                    anchorEl={anchorElMenu}
                                                    open={Boolean(anchorElMenu)}
                                                    onClose={handleCloseMenu}
                                                >
                                                    <MenuItem
                                                        onClick={() => {
                                                            handleCloseMenu();
                                                            // Handle edit
                                                        }}
                                                    >
                                                        Edit
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={() => {
                                                            deleteHandler(review._id);
                                                            handleCloseMenu();
                                                        }}
                                                    >
                                                        Delete
                                                    </MenuItem>
                                                </Menu>
                                            </ReviewCard>
                                        ))}
                                    </ReviewsContainer>
                                ) : (
                                    <Typography variant="body1">No Reviews Found. Add a review.</Typography>
                                )}
                            </ReviewsSection>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default ViewProduct;

// Styled Components
const Container = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const LeftColumn = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RightColumn = styled.div`
    flex: 2;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
`;

const ProductImage = styled.img`
    max-width: 100%;
    object-fit: contain;
    border-radius: 8px;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const ProductName = styled.h1`
    font-size: 28px;
    font-weight: bold;
`;

const PriceContainer = styled.div`
    display: flex;
    gap: 16px;
    align-items: baseline;
`;

const PriceCost = styled.span`
    font-size: 24px;
    font-weight: bold;
    color: #b12704;
`;

const PriceMrp = styled.span`
    font-size: 18px;
    color: #565959;
    text-decoration: line-through;
`;

const PriceDiscount = styled.span`
    font-size: 18px;
    color: #b12704;
`;

const Description = styled.p`
    font-size: 16px;
    color: #333;
`;

const ProductDetails = styled.div`
    margin-top: 16px;
    color: #333;
`;

const AddToCartButton = styled(BasicButton)`
    background-color: #ffa41c;
    color: #111;
    &:hover {
        background-color: #ff9900;
    }
`;

const ReviewsSection = styled.div`
    margin-top: 40px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
`;

const ReviewsContainer = styled.div`
    margin-top: 20px;
`;

const ReviewCard = styled(Card)`
    padding: 16px;
    margin-bottom: 20px;
    box-shadow: none;
    border: 1px solid #ddd;
`;

const ReviewCardHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`;

const ReviewDetails = styled.div`
    flex: 1;
`;

const ReviewContent = styled.div`
    margin-top: 8px;
`;

const LoadingContainer = styled.div`
    text-align: center;
    padding: 50px;
`;

const NotFoundContainer = styled.div`
    text-align: center;
    padding: 50px;
`;
