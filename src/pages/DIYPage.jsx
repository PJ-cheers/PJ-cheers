import React from 'react';
import { getDIYData } from '../api/recipeData';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function DIYPage() {
  const navigate = useNavigate();
  const { data: diyData } = useQuery('fetchDIYData', getDIYData);
  return (
    <BoardContainer>
      <h1 style={{ fontSize: '24px', color: 'var(--color-white)', marginTop: '2rem', marginLeft: '2rem' }}>
        DIY 칵테일
      </h1>
      <CardContainer>
        {diyData?.map((item) => {
          return (
            <PostCard
              key={item.id}
              onClick={() => {
                navigate(`/diy-recipe/${item.id}`);
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={item.image}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
              <PostTextContainer>
                <h2 style={{ margin: '1rem 0' }}>칵테일 이름: {item.name}</h2>
                <p style={{ margin: '0.5rem 0' }}>바텐더 : {item.username}</p>
              </PostTextContainer>
            </PostCard>
          );
        })}
      </CardContainer>
      <ButtonContainer>
        <AddButton
          onClick={() => {
            navigate('/add-board');
          }}
        >
          +
        </AddButton>
      </ButtonContainer>
    </BoardContainer>
  );
}

export default DIYPage;

const BoardContainer = styled.div`
  margin: 1rem;
`;
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  background-color: var(--color-main-gray);
  width: 100%;
  margin: 1rem;
  padding: 1rem;
`;
const PostCard = styled.div`
  background-color: white;
  border: 1px solid black;
  width: 97%;
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  img {
    width: 100%;
    height: auto;
    max-height: 500px;
    object-fit: contain;
  }
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;
const PostTextContainer = styled.div`
  margin: 1rem;
`;

const ButtonContainer = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 9.5rem;
`;
const AddButton = styled.button`
  font-weight: bold;
  font-size: 15px;
  padding: 15px 19px;
  background-color: var(--color-black);
  color: var(--color-white);
  border: 1px solid var(--color-white);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  &:hover {
    color: var(--color-gray);
  }
`;
