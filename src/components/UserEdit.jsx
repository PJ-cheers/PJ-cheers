import React, { useState } from 'react';
import { styled } from 'styled-components';
import { GrayButton } from '../shared/Buttons';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/user';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

function UserEdit({ isOpen, closeModal}) {
  const [userProfile, setUserProfile] = useRecoilState(userState)
  console.log(userProfile)
  const [editInput, setEditInput] = useState({
    name: userProfile.name,
    password: '',
    confirmPassword: '',
  })
  
  const edit = async (e) => {
    e.preventDefault();
    if(editInput.password !== editInput.confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다!")
      return
    }
    try{
      await updateProfile(auth.currentUser, {
        displayName: editInput.name
      })
      setUserProfile({...userProfile, name: editInput.name})
      await updateProfile(auth.currentUser, editInput.password )
      closeModal();
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + errorMessage);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen}> 
        <LoginBox>
          <ProfileBox photo={userProfile.photoURL}></ProfileBox>
          <ProfileEdit>이미지 편집</ProfileEdit>
          <UserBox>
            <NickNameBox>
              <label>닉네임</label>
              <NickNameInput
              type="text"
              value={editInput.name}
              onChange={(e) => setEditInput({...editInput, name: e.target.value})}
              ></NickNameInput>
            </NickNameBox>
            <PasswordBox>
              <label>비밀번호 변경</label>
              <PasswordInput
              type="password"
              value={editInput.password}
              onChange={(e) => setEditInput({...editInput, password: e.target.value})}
              ></PasswordInput>
            </PasswordBox>
            <ConfirmPasswordBox>
              <label>비밀번호 확인</label>
              <ConfirmPasswordInput
              type="password"
              value={editInput.confirmPassword}
              onChange={(e) => setEditInput({...editInput, confirmPassword: e.target.value})}
              ></ConfirmPasswordInput>
            </ConfirmPasswordBox>
            <Buttons>
              <GrayButton onClick={closeModal}>취소</GrayButton>
              <GrayButton onClick={edit}>수정</GrayButton>
            </Buttons>
          </UserBox>
        </LoginBox>
      </Modal>
    </>
  );
}
export default UserEdit;

const Modal = styled.div`
  display: ${(props) => {
    return props.isOpen ? 'block' : 'none';
  }};
  z-index: 40;
  position: fixed;
  padding-top: 6rem;
  background-color: rgba(0, 0, 0, 0.9);
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
`;

const ProfileBox = styled.div`
  width: 8.25rem;
  height: 8.25rem;
  border-radius: 50%;
  background-color: #ffffff;
  background-image: url(${(props) => props.photo});
  background-size: 26rem;
  background-position: center center;
  margin-top: 30px;
`;

const ProfileEdit = styled.button`
  background-color: transparent;
  border: none;
  color: #ffffff;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const UserBox = styled.div`
  width: 20rem;
  height: 23rem;
  padding-top: 60px;
  padding-left: 30px;
  border-radius: 8px;
  background-color: #a6a6a6;
`;

const NickNameBox = styled.div`
  margin-bottom: 10px;
`;

const NickNameInput = styled.input`
  width: 18rem;
  height: 1.5rem;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 20px;
`;

const PasswordBox = styled.div`
  margin-bottom: 10px;
`;

const PasswordInput = styled.input`
  width: 18rem;
  height: 1.5rem;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 20px;
`;

const ConfirmPasswordBox = styled.div`
  margin-bottom: 10px;
`;

const ConfirmPasswordInput = styled.input`
  width: 18rem;
  height: 1.5rem;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 20px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;
