import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const filteredData = location.state.cocktails;

  return (
    <>
      <StyledH1>칵테일 레시피</StyledH1>
      <StyledGrid>
        {filteredData.map((cocktail) => (
          <CocktailContainer
            onClick={() => {
              navigate(`/recipe/${cocktail.id}`);
            }}
            key={cocktail.id}
          >
            <CocktailImage src={cocktail.imgurl} />
            <CocktailName>{cocktail.krName}</CocktailName>
          </CocktailContainer>
        ))}
      </StyledGrid>
    </>
  );
}

export default Search;

const StyledH1 = styled.h1`
  margin-top: 70px;
  margin-left: 30px;
  font-size: 40px;
  color: #ffffff;
`;

const StyledGrid = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
`;

const CocktailContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CocktailImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #333;
  margin: auto;
  margin-bottom: 16px;
  object-fit: cover;
`;

const CocktailName = styled.div`
  font-size: 24px;
  color: #ffffff;
  text-align: center;
`;
