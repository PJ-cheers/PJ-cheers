import React from 'react';
import { useQuery } from 'react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

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
              key={item.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid black',
                margin: '1rem',
                width: '20rem',
                height: '30rem',
                position: 'relative'
              }}
            >
              <img
                src={item.image}
                style={{
                  width: '10rem',
                  height: '10rem',
                  borderRadius: '100%',
                  objectFit: 'cover',
                  margin: '2rem 4.5rem'
                }}
              />
              <h2 style={{ margin: '1rem 0' }}>칵테일 이름: {item.Cocktail}</h2>
              <p style={{ margin: '0.5rem 0' }}>가니쉬: {item.Garnish}</p>
              <p style={{ margin: '0.5rem 0' }}>레시피: {item.recipe}</p>
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
              key={item.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid black',
                margin: '1rem',
                width: '20rem',
                height: '30rem',
                position: 'relative'
              }}
            >
              <img
                src={item.image}
                style={{
                  width: '10rem',
                  height: '10rem',
                  borderRadius: '100%',
                  objectFit: 'cover',
                  margin: '2rem 4.5rem 0'
                }}
              />
              <h2 style={{ margin: '1rem 0' }}>칵테일 이름: {item.Cocktail}</h2>
              <p style={{ margin: '0.5rem 0' }}>레시피 : {item.recipe}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Main;
