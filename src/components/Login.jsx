import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { styled } from 'styled-components';
import { auth } from '../firebase';
import { GrayButton } from '../shared/Buttons';

function Login({ isOpen, closeModal }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const confirm = async(e) => {
    e.preventDefault();
    if(email === ""){
      alert("이메일을 입력해주세요!")
      return
    }
    if(password === ""){
      alert("비밀번호를 입력해주세요!")
      return
    }
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      closeModal();
    } catch(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode === "auth/invalid-email"){
        alert("이메일 주소를 올바르게 입력해주세요!")
        return
      }
      if(errorCode === "auth/user-not-found"){
        alert("사용자를 찾을 수 없습니다!")
        return
      }
      if(errorCode === "auth/wrong-password"){
        alert("비밀번호가 일치하지 않습니다!")
        return
      }
      if(errorCode === "auth/too-many-requestsFirebase"){
        alert("로그인 시도 횟수를 초과했습니다. 잠시 후 시도하세요!")
        return
      }
      alert( errorCode + errorMessage)
    }
  }



  return (
    <>
      <Modal isOpen={isOpen}>
        <LoginBox>
          {/* <ProfileBox></ProfileBox>
          <ProfileEdit>이미지 편집</ProfileEdit> */}
          <UserBox>
            <EmailBox>
              <label>이메일</label>
              <EmailInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ></EmailInput>
            </EmailBox>
            <PasswordBox>
              <label>비밀번호</label>
              <PasswordInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ></PasswordInput>
            </PasswordBox>
            <Buttons>
              <GrayButton onClick={closeModal}>취소</GrayButton>
              <GrayButton onClick={confirm}>로그인</GrayButton>
            </Buttons>
          </UserBox>
        </LoginBox>
      </Modal>
    </>
  );
}
export default Login;

const Modal = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
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
  margin-top: 30px;
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

// const CancelButton = styled.button`
//   background-color: #cecece;
//   border-radius: 8px;
//   margin-right: 10px;
//   height: 1.7rem;
//   width: 5rem;
//   color: #000000;
//   border: none;
// `;

// const ConfirmButton = styled.button`
//   background-color: #cecece;
//   border-radius: 8px;
//   height: 1.7rem;
//   width: 5rem;
//   color: #000000;
//   border: none;
// `;
