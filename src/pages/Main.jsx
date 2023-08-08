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

function Main() {
  const { data, isLoading, isError, error } = useQuery('fetchFirestoreData', getFirestoreData);
  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (isError) {
    return <div>Error:{error.message}</div>;
  }
  console.log(data);
  return (
    <>
      <div
        style={{
          backgroundColor: '#d9d9d9',
          width: '100%',
          display: 'flex'
        }}
      >
        {data.map((item) => {
          return (
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid black',
                margin: '20px'
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
    </>
  );
}

export default Main;
