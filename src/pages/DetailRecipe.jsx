import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

function DetailRecipe() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'cocktails'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    };
    fetchData();
  }, []);

  // useParams를 이용하여 url의 id를 가져옴
  const { id } = useParams();

  return (
    <>
      <ButtonBack>←</ButtonBack>
      <DetailContainer>
        <CocktailName>
          <h2>모히또</h2>
          <p>Mojito</p>
        </CocktailName>
        <ImgCocktail src="img/mojito.png" alt="cocktailImage" />
        <Ingredients>
          <IngredientTitle>
            <h3>재료</h3>
          </IngredientTitle>
          <IngredientContents>
            <div>
              <p>재료명1</p>
              <p>재료명2</p>
              <p>재료명3</p>
            </div>
            <div>
              <p>용량1</p>
              <p>용량2</p>
              <p>용량3</p>
            </div>
          </IngredientContents>
        </Ingredients>
        <Recipe>
          <RecipeTitle>
            <h3>레시피</h3>
          </RecipeTitle>
          <RecipeContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
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
  padding: 2rem;
`;

const IngredientTitle = styled.div`
  margin: 2rem;
  font-size: 26px;
  font-weight: 600;
`;

const IngredientContents = styled.div`
  /* background-color: lightcoral; */
  display: flex;
  justify-content: space-around;
  width: 70%;
  height: auto;
  margin: 2rem;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
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
  width: 70%;
  height: auto;
  margin: 2rem;
  text-align: center;
  line-height: 200%;
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
