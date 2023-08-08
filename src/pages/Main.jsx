import React from 'react';
import { useQuery } from 'react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Login from './Login';
import { useState } from 'react';

const getFirestoreData = async () => {
  const querySnapshot = await getDocs(collection(db, 'recipes'));
  const fetchedData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
  return fetchedData;
};

const getDIYData = async () => {
  const querySnapshot = await getDocs(collection(db, 'DIY'));
  const fetchedData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
  return fetchedData;
};

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data: recipeData } = useQuery('fetchFirestoreData', getFirestoreData);
  const { data: diyData } = useQuery('fetchDIYData', getDIYData);
  console.log(diyData);

  return (
    <>
      <h1 style={{ fontSize: '24px' }}>인기 레시피</h1>
      <div
        style={{
          backgroundColor: '#d9d9d9',
          width: '100%',
          display: 'flex'
        }}
      >
        {recipeData?.map((item) => {
          return (
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid black',
                margin: '1rem'
              }}
            >
              <img src={item.image} />
              <h2>칵테일 이름 : {item.Cocktail}</h2>
              <p>가니쉬 : {item.Garnish}</p>
              <p>레시피 : {item.recipe}</p>
            </div>
          );
        })}
      </div>
      <h1 style={{ fontSize: '24px' }}>DIY레시피</h1>
      <div
        style={{
          backgroundColor: '#d9d9d9',
          width: '100%',
          display: 'flex'
        }}
      >
        {diyData?.map((item) => {
          return (
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid black',
                margin: '1rem'
              }}
            >
              <img src={item.image} />
              <h2>칵테일 이름 : {item.Cocktail}</h2>
              <p>레시피 : {item.recipe}</p>
            </div>
          );
        })}
        <button>회원가입</button>
        <button onClick={openModal}>로그인</button>
        <Login isOpen={isModalOpen} closeModal={closeModal} />
        <button>회원수정</button>
      </div>
    </>
  );
}

export default Main;
