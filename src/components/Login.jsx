import React from 'react';
import { styled } from 'styled-components';

function Login({ isOpen, closeModal }) {
  const confirm = (e) => {
    e.prevDefaultEvent();
  };
  return (
    <Modal isOpen={isOpen}>
      <LoginBox>
        <ProfileBox></ProfileBox>
        <ProfileEdit>이미지 편집</ProfileEdit>
        <UserBox>
          <EmailBox>
            <label>이메일</label>
            <EmailInput type="email"></EmailInput>
          </EmailBox>
          <PasswordBox>
            <label>비밀번호</label>
            <PasswordInput type="password"></PasswordInput>
          </PasswordBox>
          <Buttons>
            <CancelButton onClick={closeModal}>취소</CancelButton>
            <ConfirmButton onClick={confirm}>확인</ConfirmButton>
          </Buttons>
        </UserBox>
      </LoginBox>
    </Modal>
  );
}
export default Login;

const Modal = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  z-index: 1;
  position: fixed;
  background-color: #202020;
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
  height: 15rem;
  padding-top: 60px;
  padding-left: 30px;
  border-radius: 8px;
  background-color: #a6a6a6;
`;

const EmailBox = styled.div`
  margin-bottom: 10px;
`;

const EmailInput = styled.input`
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

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;

const CancelButton = styled.button`
  background-color: #cecece;
  border-radius: 8px;
  margin-right: 10px;
  height: 1.7rem;
  width: 5rem;
  color: #000000;
  border: none;
`;

const ConfirmButton = styled.button`
  background-color: #cecece;
  border-radius: 8px;
  height: 1.7rem;
  width: 5rem;
  color: #000000;
  border: none;
`;
