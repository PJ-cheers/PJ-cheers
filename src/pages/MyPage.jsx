import React, { useEffect, useState } from 'react';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/user';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { getCocktailData } from '../api/recipeData';

const getLikedCocktailData = async () => {
  // collection 이름이 likeCocktails인 collection의 모든 document를 가져옵니다.
  const querySnapshot = await getDocs(query(collection(db, 'likeCocktails')));
  const likedCocktailData = [];

  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    // console.log(`${doc.data().cocktailId}`);
    likedCocktailData.push({
      cocktailId: doc.data().cocktailId,
      email: doc.data().email
    });
  });
  return likedCocktailData;
};

function MyPage() {
  const navigate = useNavigate();
  const { data: cocktailData } = useQuery('fetchCocktailData', getCocktailData);
  const { data: likedCocktailData } = useQuery('fetchLikedCocktailData', getLikedCocktailData);
  const [currentTab, clickTab] = useState(0);
  const userProfile = useRecoilState(userState);

  const menuArr = [
    { name: '내가 작성한 글', content: 'test' },
    { name: '내가 찜한 레시피', content: 'tes2t' }
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };
  const handleChangeUserInfo = () => {
    alert('ㅎㅇ');
  };
  console.log(userProfile.photoURL);
  return (
    <TotalBox>
      <MyPageBox>
        {userProfile[0].name === '' ? <NickName>닉네임</NickName> : <NickName>{userProfile[0].name}</NickName>}
        <PencilIcon icon={faPencil} onClick={handleChangeUserInfo} />
      </MyPageBox>
      <ImageBox>
        {userProfile[0].photoURL === '' ? (
          <UserImage photo="https://www.unite.ai/wp-content/uploads/2023/01/ben-sweet-2LowviVHZ-E-unsplash.jpg"></UserImage>
        ) : (
          <UserImage photo={userProfile[0].photoURL}></UserImage>
        )}
      </ImageBox>
      <TabBox>
        <TabMenu>
          {menuArr.map((el, index) => (
            <li
              className={index === currentTab ? 'submenu focused' : 'submenu'}
              onClick={() => selectMenuHandler(index)}
            >
              {el.name}
            </li>
          ))}
        </TabMenu>
        <Desc>
          {/* {menuArr.map((el, index) => (
            <ContentBox>
              <p>{menuArr[currentTab].content}</p>
            </ContentBox>
          ))} */}
          {currentTab === 0 ? (
            // 내가 작성한 글 탭인 경우
            <>
              <h1 style={{ fontSize: '24px', color: 'var(--color-white)', marginTop: '2rem', marginLeft: '2rem' }}>
                DIY 칵테일
              </h1>
              <ContentBox>
                <p>{menuArr[currentTab].content}</p>
              </ContentBox>
            </>
          ) : (
            // 내가 찜한 레시피 탭인 경우
            <CockTailBox>
              {cocktailData
                ?.filter((item) => likedCocktailData?.find((data) => data.cocktailId === item.id))
                .map((item) => {
                  return (
                    <CockTailImage
                      src={item.imgurl}
                      key={item.id}
                      onClick={() => {
                        navigate(`/recipe/${item.id}`);
                        window.scrollTo(0, 0);
                      }}
                    ></CockTailImage>
                  );
                })}
            </CockTailBox>
          )}
        </Desc>
      </TabBox>
    </TotalBox>
  );
}

export default MyPage;

const TotalBox = styled.div`
  background-color: #313131;
  width: 100vw;
  height: 100vh;
`;
const MyPageBox = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  margin-top: 30px;
`;

const NickName = styled.h2`
  color: #ffffff;
  font-size: 20px;
  font-weight: 400;
`;

const PencilIcon = styled(FontAwesomeIcon)`
  color: #ffffff;
  margin-left: 5px;
  text-align: center;
  justify-content: center;
  cursor: pointer;
`;
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
const UserImage = styled.div`
  width: 8.25rem;
  height: 8.25rem;
  border-radius: 50%;
  background-image: url(${(props) => props.photo});
  background-size: 26rem;
  background-position: center center;
`;

const TabBox = styled.div`
  width: 100vw;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const TabMenu = styled.ul`
  display: flex;
  text-align: center;
  justify-content: center;
  background-color: #7b7b7b;
  color: #ffffff;
  font-weight: 600;
  list-style: none;
  width: 30rem;
  margin: 0 0 30px 0;
  border-radius: 8px;
  cursor: pointer;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    width: calc(100% / 2);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 8px;
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: rgb(255, 255, 255);
    color: rgb(21, 20, 20);
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
`;

const ContentBox = styled.div`
  background-color: #ffffff;
  width: 20rem;
  height: 30rem;
  margin: 0 auto;
  margin-left: 10px;
  border-radius: 8px;
`;

// BoardRecipe UI
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

const CockTailImage = styled.img`
  width: 8.25rem;
  height: 8.25rem;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
`;
