import React from 'react';
import styled from 'styled-components';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

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

  return cocktailsData;
};

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
            <CockTailImage
              key={item.id}
              onClick={() => {
                navigate(`/recipe/${item.id}`);
              }}
            >
              {item.imgUrl}
            </CockTailImage>
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
  position: relative;
  display: grid;
  // contents 전체 items 안에 요소
  justify-items: center;
  gap: 40px;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const CockTailImage = styled.div`
  width: 8.25rem;
  height: 8.25rem;
  border-radius: 50%;
  background-color: #ffffff;
`;
