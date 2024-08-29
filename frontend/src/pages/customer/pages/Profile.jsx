import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Paper, Typography, Avatar, Container, Box } from '@mui/material';
import ShippingPage from '../components/ShippingPage';

const Profile = () => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <React.Fragment>
      <ProfileContainer maxWidth="md">
        <ProfileCard elevation={3}>
          <AvatarSection>
            <ProfileAvatar>
              <AvatarText>{currentUser ? currentUser.name[0].toUpperCase() : ''}</AvatarText>
            </ProfileAvatar>
          </AvatarSection>
          <InfoSection>
            <ProfileName variant="h4">{currentUser ? currentUser.name : 'User Name'}</ProfileName>
            <ProfileText variant="body1">Email: {currentUser ? currentUser.email : 'user@example.com'}</ProfileText>
            <ProfileText variant="body1">Role: {currentUser ? currentUser.role : 'Customer'}</ProfileText>
          </InfoSection>
        </ProfileCard>
      </ProfileContainer>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <ShippingCard variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <ShippingPage profile="Profile" />
        </ShippingCard>
      </Container>
    </React.Fragment>
  );
};

export default Profile;

// Styled Components

const ProfileContainer = styled(Container)`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
`;

const ProfileCard = styled(Paper)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const AvatarSection = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
`;

const ProfileAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  background-color: #3f51b5;
  font-size: 40px;
  font-weight: bold;
`;

const AvatarText = styled.h1`
  color: #fff;
  font-size: 50px;
`;

const InfoSection = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled(Typography)`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
`;

const ProfileText = styled(Typography)`
  font-size: 16px;
  color: #666;
  margin-bottom: 8px;
`;

const ShippingCard = styled(Paper)`
  border-radius: 12px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;
