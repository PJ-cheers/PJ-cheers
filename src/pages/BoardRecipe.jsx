import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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
      <HeaderMiddle>
        <input type="text" placeholder="검색어를 입력해 주세요"></input>
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </HeaderMiddle>

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
const HeaderMiddle = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  width: 40rem;
  margin: 0 auto;
  margin-bottom: 60px;

  & > input {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 3rem;
  }

  & > button {
    border: none;
    background-color: #fff;
    position: absolute;
    right: 10px;
    color: #dcdcdc;
  }
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
