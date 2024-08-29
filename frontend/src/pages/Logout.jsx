import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userSlice';
import styled from 'styled-components';
import { updateCustomer } from '../redux/userHandle';

const Logout = () => {
  const { currentUser, currentRole } = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentRole === "Customer") {
      console.log(currentUser);
      dispatch(updateCustomer(currentUser, currentUser._id));
    }
  }, [currentRole, currentUser, dispatch]);

  const handleLogout = () => {
    dispatch(authLogout());
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <LogoutContainer>
      <Username>{currentUser.name}</Username>
      <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
      <ButtonGroup>
        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
        <CancelButton onClick={handleCancel}>Cancel</CancelButton>
      </ButtonGroup>
    </LogoutContainer>
  );
};

export default Logout;

// Styled Components

const LogoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
`;

const Username = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const LogoutMessage = styled.p`
  font-size: 18px;
  color: #555;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;
`;

const LogoutButton = styled(Button)`
  background-color: #d32f2f;
  color: #fff;

  &:hover {
    background-color: #b71c1c;
  }
`;

const CancelButton = styled(Button)`
  background-color: #1976d2;
  color: #fff;

  &:hover {
    background-color: #1565c0;
  }
`;
