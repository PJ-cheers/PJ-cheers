import { atom } from 'recoil';

export const userState = atom({
  key: 'userProfile',
  default: {
    name: '',
    email: '',
    photoURL: ''
  }
});
