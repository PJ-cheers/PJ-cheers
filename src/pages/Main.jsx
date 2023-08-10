import React from 'react';
import { useQuery } from 'react-query';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
const getDIYData = async () => {
  const querySnapshot = await getDocs(collection(db, 'DIY'));
  const fetchedData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
  return fetchedData;
};
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

function Main() {
  const { data: diyData } = useQuery('fetchDIYData', getDIYData);
  const { data: cocktailData } = useQuery(['fetchCocktailData'], getCocktailData, { refetchOnWindowFocus: false });

  return (
    <>
      <h1 style={{ fontSize: '24px' }}>인기 레시피</h1>
      <div style={{ display: 'flex', width: '100%' }}>
        {cocktailData?.map((item) => {
          const ingredients = item?.ingredients || [];
          return (
            <div
              key={item.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid black',
                margin: '1rem',
                width: '20rem',
                height: '24rem',
                position: 'relative'
              }}
            >
              <h2>{item.krName}</h2>
              <p>{item.enName}</p>
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
                height: '24rem',
                position: 'relative'
              }}
            >
              <img
                src={item.image}
                alt="test"
                style={{
                  width: '10rem',
                  height: '10rem',
                  borderRadius: '100%',
                  objectFit: 'cover',
                  margin: '2rem 4.5rem 0'
                }}
              />
              <h2 style={{ margin: '2rem 0' }}>{item.name}</h2>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Main;
