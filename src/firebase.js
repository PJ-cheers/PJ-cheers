import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

const uploadProfileImage = async (url) => {
  console.log('이미지');
};

export const firebaseSignUp = async ({ name, email, password, photo }) => {
  // 2. email, password로 유저를 만든다.
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

  // return user;

  // 3. 프로필사진을 firebase storage에 업로드한다.
  const photoURL = await uploadProfileImage(photo);
  // 4. 가입한 유저 정보에 이름, 프로필사진 정보를 저장한다.
};
