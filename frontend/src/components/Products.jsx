import React, { useState } from 'react';
import { Container, Grid, Pagination } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import { BasicButton } from '../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { addStuff } from '../redux/userHandle';

const Products = ({ productData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsPerPage = 9;

  const { currentRole, responseSearch } = useSelector(state => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleUpload = (event, product) => {
    event.stopPropagation();
    dispatch(addStuff("ProductCreate", product));
  };

  const messageHandler = (event) => {
    event.stopPropagation();
    setMessage("You have to login or register first");
    setShowPopup(true);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (responseSearch) {
    return <NoProductMessage>Product not found</NoProductMessage>;
  }

  return (
    <>
      <ProductGrid container spacing={3}>
        {currentItems.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProductCard onClick={() => navigate(`/product/view/${data._id}`)}>
              <ProductImage src={data.productImage} alt={data.productName} />
              <ProductName>{data.productName}</ProductName>
              <PriceDetails>
                <PriceMrp>{data.price.mrp}</PriceMrp>
                <PriceCost>₹{data.price.cost}</PriceCost>
                <PriceDiscount>{data.price.discountPercent}% off</PriceDiscount>
              </PriceDetails>
              <ActionButton>
                {currentRole === 'Customer' && (
                  <BasicButton onClick={(event) => handleAddToCart(event, data)}>
                    Add To Cart
                  </BasicButton>
                )}
                {currentRole === 'Shopcart' && (
                  <BasicButton onClick={(event) => handleUpload(event, data)}>
                    Upload
                  </BasicButton>
                )}
                {currentRole === null && (
                  <BasicButton onClick={messageHandler}>
                    Add To Cart
                  </BasicButton>
                )}
              </ActionButton>
            </ProductCard>
          </Grid>
        ))}
      </ProductGrid>

      <PaginationContainer>
        <Pagination
          count={Math.ceil(productData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
      </PaginationContainer>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default Products;

const ProductGrid = styled(Grid)`
  padding: 20px;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  max-width: 240px;
  margin: 0 auto;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
  border-radius: 6px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
`;

const PriceDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
`;

const PriceMrp = styled.span`
  font-size: 12px;
  text-decoration: line-through;
  color: #999;
`;

const PriceCost = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #ff5722;
`;

const PriceDiscount = styled.span`
  font-size: 12px;
  color: #4caf50;
`;

const ActionButton = styled.div`
  margin-top: 12px;
`;

const PaginationContainer = styled(Container)`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const NoProductMessage = styled.div`
  font-size: 18px;
  color: #999;
  text-align: center;
  margin: 40px 0;
`;
