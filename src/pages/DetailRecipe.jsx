import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import { YoutubeDataContext } from '../api/YoutubeDataContext';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { userState, loginState } from '../recoil/user';
import { getCocktailData } from '../api/recipeData';

// firebase
import { db, auth } from '../firebase';
import { addDoc, getDoc, getDocs, collection, doc, deleteDoc } from 'firebase/firestore';

// 아이콘
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faHeart } from '@fortawesome/free-solid-svg-icons';

// 버튼 클릭 시 뒤로가기
function historyBack() {
  window.history.back();
}

function DetailRecipe() {
  const { videosList } = useContext(YoutubeDataContext);
  const playlistId = 'PLhD80yCklGmZqOBTMAlfMz0sZryCVKO_Y';
  const videoData = videosList[playlistId];
  console.log(videoData);
  const { id } = useParams();
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const { data: cocktailData } = useQuery('fetchCocktailData', getCocktailData);

  function findCocktail(item) {
    return item.id === id;
  }

  // 하트 버튼 클릭 시 active 상태 변경
  const [isActive, setIsActive] = useState(false);
  function handleClick() {
    setIsActive(!isActive);
  }

  // 하트 버튼 클릭 시 클릭한 요소의 데이터 firestore에 추가됨
  const likeCocktails = async (e) => {
    const newLike = {
      email: auth.currentUser.email,
      cocktailId: id,
      isActive: isActive
    };
    // Firestore에서 'users' 컬렉션에 대한 참조 생성하기, 'users' 컬렉션에 newLike 문서를 추가
    if (isActive === false) {
      await addDoc(collection(db, 'likeCocktails'), newLike);
      console.log(newLike);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    cssEase: 'linear',
    slide: 'div'
  };

  return (
    <>
      <ButtonBack onClick={historyBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </ButtonBack>
      <DetailContainer>
        {isLogin ? (
          <LikeBox>
            <Like
              className={isActive ? 'active' : ''}
              onClick={() => {
                likeCocktails();
                handleClick();
                alert('찜한 레시피에 추가되었습니다.');
              }}
            >
              <FontAwesomeIcon icon={faHeart} size="lg" />
            </Like>
          </LikeBox>
        ) : null}
        <CocktailName>
          <h2>{cocktailData?.find(findCocktail).krName}</h2>
          <p>{cocktailData?.find(findCocktail).enName}</p>
        </CocktailName>
        <ImgCocktail>
          <img src={cocktailData?.find(findCocktail).imgurl} alt="cocktailImage" />
        </ImgCocktail>
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
            <Slider {...sliderSettings}>
              {videoData?.map((video, index) => {
                const { title, thumbnails } = video.snippet;
                const { videoId } = video.snippet.resourceId;
                return (
                  <SlickSlideStyled key={index}>
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <p>{title}</p>
                  </SlickSlideStyled>
                );
              })}
            </Slider>
          </VideoContent>
        </Video>
      </DetailContainer>
    </>
  );
}

export default DetailRecipe;

const SlickSlideStyled = styled.div`
  background-color: #d9d9d9;
  padding: 5px;
  border-radius: 10px;
  margin: 10px;
`;

const ButtonBack = styled.button`
  background-color: transparent;
  margin: 1rem;
  padding: 1rem;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

const LikeBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: end;
  margin: 1rem;
`;

const Like = styled.button`
  background-color: #fff;
  color: var(--color-gray);
  padding: 0.5rem;
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    color: var(--color-black);
  }

  &:active {
    color: #ff0000;
  }
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
  margin: 0 0 2rem 0;

  & > h2 {
    font-size: 32px;
    margin: 1rem 0;
  }

  & > p {
    color: #a6a6a6;
  }
`;

const ImgCocktail = styled.div`
  width: 30rem;
  height: 30rem;
  margin: 2rem 0;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 100%;
    height: auto;
  }
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
  position: relative;
  overflow: hidden;
  gap: 10px;
  width: 100%;
`;
