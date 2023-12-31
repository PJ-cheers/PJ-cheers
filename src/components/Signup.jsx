import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { firebaseSignUp, storage } from '../firebase';
import { userState } from '../recoil/user';
import { GrayButton } from '../shared/Buttons';

function Signup({ isOpen, closeModal }) {
  const initialState = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    photo: 'https://www.unite.ai/wp-content/uploads/2023/01/ben-sweet-2LowviVHZ-E-unsplash.jpg'
  };
  const [input, setInput] = useState(initialState);
  const [userProfile, setUserProfile] = useRecoilState(userState);

  const imageFile = React.useRef(null);

  const selectImage = async (e) => {
    const image = e.target.files[0];
    if (image !== undefined) {
      const imageRef = ref(storage, `${userProfile.email}/${image.name}`);
      await uploadBytes(imageRef, image);

      const downloadURL = await getDownloadURL(imageRef);
      console.log(downloadURL);
      setInput({ ...input, photo: downloadURL });
    }
  };
  const cancelButtonClickHandler = () => {
    closeModal();
    setInput(initialState);
  };

  const confirmButtonClickHandler = async (e) => {
    e.preventDefault();
    if (!input.email) {
      alert('이메일을 입력해주세요!');
      return;
    }
    if (!input.name) {
      alert('닉네임을 입력해주세요!');
      return;
    }
    if (!input.password) {
      alert('비밀번호를 입력해주세요!');
      return;
    }
    if (!input.confirmPassword) {
      alert('비밀번호 확인을 입력해주세요!');
      return;
    }
    if (input.password !== input.confirmPassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다!');
      return;
    }
    try {
      const editedUserProfile = await firebaseSignUp({
        name: input.name,
        email: input.email,
        password: input.password,
        photo: input.photo
      });
      alert('회원가입에 성공했습니다!');
      setUserProfile(editedUserProfile);
      setInput(initialState);
      closeModal();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        alert('이메일 주소를 올바르게 입력해주세요!');
        return;
      }
      if (errorCode === 'auth/weak-password') {
        alert('비밀번호를 6자 이상 입력해주세요!');
        return;
      }
      if (errorCode === 'auth/email-already-in-use') {
        alert('이미 가입된 이메일 주소입니다!');
        return;
      }
      alert(errorCode + errorMessage);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen}>
        <LoginBox>
          <ProfileBox photo={input.photo}></ProfileBox>
          <ProfileEdit
            onClick={() => {
              imageFile.current.click();
            }}
          >
            이미지 업로드
          </ProfileEdit>
          <UploadImageInput type="file" ref={imageFile} onChange={selectImage} />
          <UserBox>
            <EmailBox>
              <label>이메일</label>
              <EmailInput
                type="email"
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
              ></EmailInput>
            </EmailBox>
            <NickNameBox>
              <label>닉네임</label>
              <NickNameInput
                type="text"
                value={input.name}
                onChange={(e) => setInput({ ...input, name: e.target.value })}
              ></NickNameInput>
            </NickNameBox>
            <PasswordBox>
              <label>비밀번호</label>
              <PasswordInput
                type="password"
                value={input.password}
                onChange={(e) => setInput({ ...input, password: e.target.value })}
              ></PasswordInput>
            </PasswordBox>
            <ConfirmPasswordBox>
              <label>비밀번호 확인</label>
              <ConfirmPasswordInput
                type="password"
                value={input.confirmPassword}
                onChange={(e) => setInput({ ...input, confirmPassword: e.target.value })}
              ></ConfirmPasswordInput>
            </ConfirmPasswordBox>
            <Buttons>
              <GrayButton onClick={cancelButtonClickHandler}>취소</GrayButton>
              <GrayButton onClick={confirmButtonClickHandler}>확인</GrayButton>
            </Buttons>
          </UserBox>
        </LoginBox>
      </Modal>
    </>
  );
}
export default Signup;

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
const UploadImageInput = styled.input`
  display: none;
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
  cursor: pointer;
`;

const UserBox = styled.div`
  width: 20rem;
  height: 30rem;
  padding: 60px 15px 0px 15px;
  border-radius: 8px;
  background-color: #a6a6a6;
`;

const EmailBox = styled.div`
  margin-bottom: 10px;
  margin-left: 10px;
`;

const EmailInput = styled.input`
  width: 18rem;
  height: 1.5rem;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 20px;
  padding: 5px 0 5px 10px;
`;

const NickNameBox = styled.div`
  margin-bottom: 10px;
  margin-left: 10px;
`;

const NickNameInput = styled.input`
  width: 18rem;
  height: 1.5rem;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 20px;
  padding: 5px 0 5px 10px;
`;

const PasswordBox = styled.div`
  margin-bottom: 10px;
  margin-left: 10px;
`;

const PasswordInput = styled.input`
  width: 18rem;
  height: 1.5rem;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 20px;
  padding: 5px 0 5px 10px;
`;

const ConfirmPasswordBox = styled.div`
  margin-bottom: 10px;
  margin-left: 10px;
`;

const ConfirmPasswordInput = styled.input`
  width: 18rem;
  height: 1.5rem;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 20px;
  padding: 5px 0 5px 10px;
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
