import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { doc, getDoc, getDocs, collection, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useQuery } from 'react-query';
import { GrayButton } from '../shared/Buttons';

// 아이콘
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// const getCocktailData = async () => {
//   const cocktailCollectionRef = collection(db, 'DIY');
//   const cocktailQuerySnapshot = await getDocs(cocktailCollectionRef);

//   return cocktailsData;
// };

// const getCocktailData = async () => {
//   const querySnapshot = await getDocs(collection(db, 'DIY'));
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, ' => ', doc.data());
//   });
// };

// 버튼 클릭 시 뒤로가기
function historyBack() {
  window.history.back();
}

function DIYdetail() {
  const [cocktails, setCocktails] = useState();

  // useParams를 이용하여 url의 id를 가져옴
  const { id } = useParams();

  // const { data: cocktailData } = useQuery('fetchCocktailData', getCocktailData);

  function findCocktail(item) {
    return item.id === id;
  }

  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 DIY인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, 'DIY'));
      const querySnapshot = await getDocs(q);

      const initialTodos = [];

      // document의 id와 데이터를 initialTodos에 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        initialTodos.push({ id: doc.id, ...doc.data() });
      });

      // firestore에서 가져온 데이터를 state에 전달
      setCocktails(initialTodos);
    };

    fetchData();
  }, []);

  return (
    <>
      <ButtonBack onClick={historyBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </ButtonBack>
      <DetailContainer>
        <EditDelete>
          <div>수정</div>
          <div>삭제</div>
        </EditDelete>
        <CocktailName>
          <h2>{cocktails?.find(findCocktail).name}</h2>
        </CocktailName>
        <ImgCocktail>
          <img src={cocktails?.find(findCocktail).image} alt="cocktailImage" />
        </ImgCocktail>
        <Recipe>
          <RecipeTitle>
            <h3>내용</h3>
          </RecipeTitle>
          <RecipeContent>
            <p>{cocktails?.find(findCocktail).content}</p>
          </RecipeContent>
        </Recipe>
        <CommentBox>
          <CommentHead>
            <h3>댓글</h3>
          </CommentHead>
          <Comments>
            <CommentProfileImg>
              <img src="" alt="" />
            </CommentProfileImg>
            <Comment>
              <p>닉네임</p>
              <p>댓글 내용</p>
            </Comment>
          </Comments>
          <form>
            <CommentContent type="text" placeholder="댓글을 입력해 주세요"></CommentContent>
          </form>
          <ButtonBox>
            <GrayButton style={{ borderRadius: 'none' }}>등록</GrayButton>
          </ButtonBox>
        </CommentBox>
      </DetailContainer>
    </>
  );
}

export default DIYdetail;

const ButtonBack = styled.button`
  background-color: transparent;
  margin: 1rem;
  padding: 1rem;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: auto;
`;

const EditDelete = styled.div`
  color: #fff;
  width: 80%;
  display: flex;
  justify-content: end;
  margin: 1rem;

  & > :first-child {
    padding-right: 0.5rem;
    border-right: 1px solid #fff;
  }
  & > :last-child {
    padding-left: 0.5rem;
  }
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
    color: var(--color-gray);
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

const CommentBox = styled.div`
  margin: 2rem 0;
  width: 50rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const CommentHead = styled.div`
  border-bottom: 1px solid #fff;
  color: #fff;
  width: 100%;
  padding: 1rem;
  font-size: 18px;
`;

const CommentContent = styled.textarea`
  background-color: transparent;
  color: #fff;
  box-sizing: border-box;
  padding: 1rem;
  margin: 1rem;
  width: 50rem;
  height: 5rem;
  resize: none;

  &::placeholder {
  }
`;

const Comments = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
`;

const CommentProfileImg = styled.div`
  background-color: var(--color-gray);
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  margin: 1rem;
`;

const Comment = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 1rem;
  padding: 1rem;

  gap: 1rem;

  & > :first-child {
    color: var(--color-gray);
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;
