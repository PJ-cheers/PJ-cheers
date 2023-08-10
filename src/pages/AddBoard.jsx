import React, { useState } from 'react';
import { styled } from 'styled-components';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { GrayButton } from '../shared/Buttons';

function AddBoard() {
  const fileInput = React.useRef(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleCancelClick = (e) => {
    e.preventDefault();
    navigate('/diy-recipe');
  };
  const handleSaveClick = async (e) => {
    e.preventDefault();

    if (title.trim() === '') {
      setModalMessage('제목을 입력해주세요.');
      setIsModalOpen(true);
      return;
    } else if (content.trim() === '') {
      setModalMessage('내용을 입력해주세요.');
      setIsModalOpen(true);
      return;
    } else if (fileName.trim() === '') {
      setModalMessage('업로드할 이미지를 선택해주세요.');
      setIsModalOpen(true);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'DIY'), {
        name: title,
        content: content,
        // user,
        image: imgUrl
      });

      console.log('Document written with ID: ', docRef.id);
      // 추가 성공 시, 상태 초기화
      navigate('/diy-recipe');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    setIsModalOpen(true);
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleUploadClick = (e) => {
    fileInput.current.click();
  };
  const handleChange = (e) => {
    console.log(e.target.files[0]);
    e.preventDefault();
    const file = e.target.files;
    if (!file) return null;

    const storageRef = ref(storage, `files/${file[0].name}`);
    const uploadTask = uploadBytes(storageRef, file[0]);
    setFileName(e.target.files[0].name);

    uploadTask.then((snapshot) => {
      e.target.value = '';
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setImgUrl(downloadURL);
      });
    });
  };
  return (
    <AddBoardBox>
      <PageName>새 게시물 작성하기</PageName>
      <ContentBox>
        <Title type="text" value={title} onChange={handleChangeTitle} placeholder="제목을 입력해 주세요"></Title>
        <Content
          type="text"
          value={content}
          onChange={handleChangeContent}
          placeholder="내용을 입력해 주세요"
        ></Content>
      </ContentBox>
      <Buttons>
        <div>
          <GrayButton onClick={handleUploadClick}>업로드</GrayButton>
          <Upload type="file" ref={fileInput} onChange={handleChange}></Upload>
          <UploadInfo>{fileName}</UploadInfo>
        </div>
        <div>
          <GrayButton onClick={handleCancelClick}>취소</GrayButton>
          <GrayButton onClick={handleSaveClick}>게시</GrayButton>
        </div>
      </Buttons>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalMessage>{modalMessage}</ModalMessage>
            <GrayButton onClick={() => setIsModalOpen(false)}>닫기</GrayButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </AddBoardBox>
  );
}

export default AddBoard;

const AddBoardBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 6rem;
  background-color: #313131;
  justify-items: center;
  text-align: center;
  width: 100vw;
  height: 100vh;
`;
const PageName = styled.h1`
  color: #ffffff;
  font-weight: 400;
  font-size: 24px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Title = styled.input`
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 50px;
  padding-left: 15px;
  width: 50rem;
  height: 2.5rem;
`;

const Content = styled.textarea`
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 50px;
  padding-left: 15px;
  padding-top: 15px;
  width: 50rem;
  height: 20rem;
  resize: none;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50rem;
  margin: 40px auto;
`;

const Upload = styled.input`
  display: none;
`;
const UploadInfo = styled.span`
  margin-left: 10px;
  color: #ffffff;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const ModalMessage = styled.div`
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 10px;
`;
