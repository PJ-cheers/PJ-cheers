import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { GrayButton } from '../shared/Buttons';
import { db, storage } from '../firebase';
import { doc, updateDoc, getDocs, collection, query } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/user';

function EditBoard() {
  const userProfile = useRecoilValue(userState);
  const fileInput = React.useRef(null);
  const [cocktails, setCocktails] = useState();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleCancelClick = (e) => {
    e.preventDefault();
    navigate(`/diy-recipe/${id}`);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const mutationUpdate = useMutation(
    async () => {
      const docRef = doc(db, 'DIY', id);
      await updateDoc(docRef, {
        name: title,
        content: content,
        username: userProfile.name,
        image: imgUrl
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchDIYData'); // 해당 데이터를 다시 불러오기 위해 쿼리를 무효화
        navigate(`/diy-recipe/${id}`);
      },
      onError: (error) => {
        console.error('Error updating document: ', error);
      }
    }
  );

  useEffect(() => {
    const fetchData = async (e) => {
      // collection 이름이 DIY인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, 'DIY'));
      const querySnapshot = await getDocs(q);
      const initialTodos = [];

      // document의 id와 데이터를 initialTodos에 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        initialTodos.push({ id: doc.id, ...doc.data() });
      });

      // firestore에서 가져온 데이터를 state에 전달
      setCocktails(initialTodos);
      const cocktailData = initialTodos.find((item) => item.id === id);
      if (cocktailData) {
        setTitle(cocktailData.name);
        setContent(cocktailData.content);
        setFileName(cocktailData.fileName);
        setImgUrl(cocktailData.imgUrl);
      }
    };

    fetchData();
  }, [id]);

  const handleUploadClick = (e) => {
    fileInput.current.click();
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    setModalMessage('정말 수정하시겠습니까?');
  };

  const handleConfirmUpdate = () => {
    mutationUpdate.mutate(); // 수정 요청 보내기
    setIsModalOpen(false);
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
    <EditBoardBox>
      <PageName>게시물 수정하기</PageName>
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
          <GrayButton onClick={handleUpdateClick}>수정</GrayButton>
        </div>
      </Buttons>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalMessage>{modalMessage}</ModalMessage>
            <GrayButton onClick={handleConfirmUpdate}>확인</GrayButton>
            <GrayButton onClick={() => setIsModalOpen(false)}>취소</GrayButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </EditBoardBox>
  );
}

export default EditBoard;

const EditBoardBox = styled.div`
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
