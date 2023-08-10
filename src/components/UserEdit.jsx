import React from 'react';
import { styled } from 'styled-components';
import { GrayButton } from '../shared/Buttons';

function UserEdit({ isOpen, closeModal }) {
  const edit = (e) => {
    e.prevDefaultEvent();
  };
  return (
    <>
      <Modal isOpen={isOpen}>
        <LoginBox>
          <ProfileBox></ProfileBox>
          <ProfileEdit>이미지 편집</ProfileEdit>
          <UserBox>
            <NickNameBox>
              <label>닉네임</label>
              <NickNameInput type="text"></NickNameInput>
            </NickNameBox>
            <PasswordBox>
              <label>비밀번호 변경</label>
              <PasswordInput type="password"></PasswordInput>
            </PasswordBox>
            <ConfirmPasswordBox>
              <label>비밀번호 확인</label>
              <ConfirmPasswordInput type="password"></ConfirmPasswordInput>
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
  z-index: 30;
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
