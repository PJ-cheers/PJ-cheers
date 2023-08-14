import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { GrayButton } from '../shared/Buttons';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/user';
import { updateProfile } from 'firebase/auth';
import { auth, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useMemo } from 'react';

function UserEdit({ isOpen, closeModal}) {
  console.log('userEdit')
  const [userProfile, setUserProfile] = useRecoilState(userState)
  console.log(userProfile)
  const initialState = useMemo(() => {
    return {
      name: userProfile.name,
      photo: userProfile.photoURL
    }
  }, [userProfile])

  const [editInput, setEditInput] = useState(initialState)

  const editImageFile = React.useRef(null);

  const inputClickHandler = () => {
    editImageFile.current.click();
  }
  const onSelectImage = async(e)=> {
    const image = e.target.files[0]
    if(image !== undefined){
      const imageRef = ref(storage, `${userProfile.email}/${image.name}`)
      await uploadBytes(imageRef, image);
  
      const downloadURL = await getDownloadURL(imageRef)
      console.log(downloadURL)
      setEditInput({...editInput, photo: downloadURL})
    }
  }
  const onCancelButtonClickHandler = () => {
    setEditInput(initialState)
    closeModal()
  }
  const onEditButtonClickHandler = async (e) => {
    // e.preventDefault();
    await updateProfile(auth.currentUser, { displayName: editInput?.name, photoURL: editInput?.photo });
    setUserProfile({...userProfile, name: editInput.name, photoURL: editInput.photo})
    closeModal();
  }
  
  useEffect(() => {
    setEditInput(initialState)
  },[initialState])

  return (
    <>
      <Modal isOpen={isOpen}> 
        <LoginBox>
          <ProfileBox photo={editInput?.photo}></ProfileBox>
          <ProfileEdit onClick={inputClickHandler}>이미지 편집</ProfileEdit>
          <UploadImageInput type='file' ref={editImageFile} onChange={onSelectImage}/>
          <UserBox>
            <NickNameBox>
              <label>닉네임</label>
              <NickNameInput
              type="text"
              value={editInput?.name}
              onChange={(e) => setEditInput({...editInput, name: e.target.value})}
              ></NickNameInput>
            </NickNameBox>
            <Buttons>
              <GrayButton onClick={onCancelButtonClickHandler}>취소</GrayButton>
              <GrayButton onClick={onEditButtonClickHandler}>수정</GrayButton>
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

const UploadImageInput = styled.input`
  display: none;
`

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
  height: 10rem;
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
