import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getCocktailData } from '../api/recipeData';

function BoardRecipe() {
  const navigate = useNavigate();

  const { data: cocktailData } = useQuery('fetchCocktailData', getCocktailData);

  console.log(cocktailData);
  return (
    <RecipeBody>
      <Title>칵테일 레시피</Title>
      <CockTailBox>
        {cocktailData?.map((item) => {
          return (
            <CockTailItem
              key={item.id}
              onClick={() => {
                navigate(`/recipe/${item.id}`);
                window.scrollTo(0, 0);
              }}
            >
              <CockTailImage src={item.imgurl} alt={item.krName} />
              <CockTailName>{item.krName}</CockTailName>
            </CockTailItem>
          );
        })}
      </CockTailBox>
    </RecipeBody>
  );
}

export default BoardRecipe;

const RecipeBody = styled.div`
  background-color: #313131;
`;
const Title = styled.h1`
  color: #ffffff;
  font-weight: 400;
  font-size: 24px;
  padding-top: 20px;
  padding-left: 20px;
  margin-bottom: 60px;
`;

const CockTailBox = styled.div`
  margin-top: 30px;
  display: grid;
  justify-items: center;
  gap: 40px;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const CockTailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1.3);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const CockTailImage = styled.img`
  width: 8.25rem;
  height: 8.25rem;
  border-radius: 50%;
  background-color: #ffffff;
`;

const CockTailName = styled.p`
  font-size: 20px;
  margin-top: 8px;
  color: #ffffff;
`;
