import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useQuery } from 'react-query';

const getCocktailData = async () => {
  const cocktailCollectionRef = collection(db, 'cocktails');
  const cocktailQuerySnapshot = await getDocs(cocktailCollectionRef);

  const cocktailsDataPromises = cocktailQuerySnapshot.docs.map(async (cocktailDoc) => {
    const cocktailId = cocktailDoc.id;

    const cocktailSnapshot = await getDoc(cocktailDoc.ref);

    const ingredientsSnapshot = await getDocs(collection(cocktailDoc.ref, 'ingredients'));

    return {
      id: cocktailId,
      ...cocktailSnapshot.data(),
      ingredients: ingredientsSnapshot.docs.map((ingredientDoc) => {
        return {
          id: ingredientDoc.id,
          ...ingredientDoc.data()
        };
      })
    };
  });

  const cocktailsData = await Promise.all(cocktailsDataPromises);

  console.log(cocktailsData);
  return cocktailsData;
};

function DetailRecipe() {
  // useParams를 이용하여 url의 id를 가져옴
  const { id } = useParams();

  const { data: cocktailData } = useQuery('fetchCocktailData', getCocktailData);

  function findCocktail(item) {
    return item.id === id;
  }

  return (
    <>
      <ButtonBack>←</ButtonBack>
      <DetailContainer>
        <CocktailName>
          <h2>{cocktailData?.find(findCocktail).krName}</h2>
          <p>{cocktailData?.find(findCocktail).enName}</p>
        </CocktailName>
        <ImgCocktail src={cocktailData?.find(findCocktail).cocktailImg} alt="cocktailImage" />
        <Ingredients>
          <IngredientTitle>
            <h3>재료</h3>
          </IngredientTitle>
          {cocktailData?.find(findCocktail).ingredients.map((ingredient) => {
            return (
              <IngredientContents>
                <p>{ingredient.ingName}</p>
                <p>{ingredient.ingVolume}</p>
              </IngredientContents>
            );
          })}
        </Ingredients>
        <Recipe>
          <RecipeTitle>
            <h3>레시피</h3>
          </RecipeTitle>
          <RecipeContent>
            <p>{cocktailData?.find(findCocktail).recipe}</p>
          </RecipeContent>
        </Recipe>
        <Video>
          <VideoTitle>
            <h4>관련영상</h4>
          </VideoTitle>
          <VideoContent>
            <div>동영상</div>
            <p>영상 제목</p>
            <p>Youtube</p>
          </VideoContent>
        </Video>
      </DetailContainer>
    </>
  );
}

export default DetailRecipe;

const ButtonBack = styled.button`
  background-color: transparent;
  margin: 1rem;
  border: none;
  color: #fff;
  font-size: 2rem;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: auto;
`;

const CocktailName = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;

  & > h2 {
    font-size: 32px;
    margin: 1rem 0;
  }

  & > p {
    color: #a6a6a6;
  }
`;

const ImgCocktail = styled.img`
  width: 30rem;
  height: 30rem;
  margin: 1rem 0;
`;

const Ingredients = styled.div`
  background-color: #fff;
  margin: 2rem 0;
  width: 50rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 3rem 2rem;
`;

const IngredientTitle = styled.div`
  margin: 2rem;
  font-size: 26px;
  font-weight: 600;
`;

const IngredientContents = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  height: auto;
  margin: 1rem;
`;

const Recipe = styled.div`
  color: #fff;
  margin: 2rem 0;
  width: 50rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border: 1px solid #fff;
`;

const RecipeTitle = styled.div`
  margin: 2rem;
  font-size: 26px;
  font-weight: 600;
`;

const RecipeContent = styled.div`
  width: 60%;
  height: auto;
  margin: 2rem;
  text-align: center;
  line-height: 300%;
`;

const Video = styled.div`
  background-color: #fff;
  margin: 2rem 0;
  width: 50rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const VideoTitle = styled.div`
  margin: 2rem;
  font-size: 26px;
  font-weight: 600;
`;

const VideoContent = styled.div`
  width: 70%;
  height: auto;
  margin: 2rem;

  & > :nth-child(1) {
    background-color: #000;
    width: 12rem;
    height: 7rem;
  }

  & > :nth-child(2) {
    margin: 1rem 0 0.4rem 0;
  }
  & > :nth-child(3) {
    color: #a6a6a6;
    font-size: 0.8rem;
  }
`;
