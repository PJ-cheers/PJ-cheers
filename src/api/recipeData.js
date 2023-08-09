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

export { getFirestoreData, getDIYData };
