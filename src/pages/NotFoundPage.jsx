import React from 'react';
import { GrayButton } from '../shared/Buttons';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleButtonMain = (e) => {
    e.preventDefault();
    navigate('/');
  };
  return (
    <TotalBox>
      <InfoBox>
        <Title>존재하지 않는 페이지</Title>
        <Button>
          <GrayButton onClick={handleButtonMain}>메인 페이지로</GrayButton>
        </Button>
      </InfoBox>
    </TotalBox>
  );
}

export default NotFoundPage;

const TotalBox = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ffffff;
  width: 20rem;
  height: 30rem;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-family: 400;
  color: #ffffff;
  margin-top: 100px;
  text-align: center;
`;

const Button = styled.div`
  margin-top: 100px;
  text-align: center;
`;
