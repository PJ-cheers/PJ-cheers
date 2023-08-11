import React from 'react';
import styled from 'styled-components';
import { GrayButton } from '../shared/Buttons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import {userState} from '../recoil/user'

function SideBar({ onClose, onLogin, onSignup, onEdit, isLogin, onLogout }) {
  const navigate = useNavigate();

  const handleListClick = (path) => {
    onClose();
    navigate(path);
  };
  const userProfile = useRecoilState(userState)

  return (
    <Wrapper onClick={onClose}>
      <SidebarContent onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} style={{ fontSize: '30px' }} />
        </CloseIcon>
        {isLogin ? (
          <>
            <ImgWrapper>
              <ProfileImg photo={userProfile[0].photoURL} />
            </ImgWrapper>
            <ButtonWrapper>
              <GrayButton onClick={onEdit}>프로필 수정</GrayButton>
            </ButtonWrapper>
            <NaviWrapper>
              <List onClick={() => handleListClick('/recipe')}>칵테일 레시피</List>
              <List onClick={() => handleListClick('/diy-recipe')}>DIY 칵테일</List>
              <List onClick={() => handleListClick('/mypage')}>마이페이지</List>
            </NaviWrapper>
            <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
          </>
        ) : (
          <>
            <ImgWrapper>
              <ProfileImg photo="https://www.unite.ai/wp-content/uploads/2023/01/ben-sweet-2LowviVHZ-E-unsplash.jpg" />
            </ImgWrapper>
            <ButtonWrapper>
              <GrayButton onClick={onLogin}>로그인</GrayButton>
              <GrayButton onClick={onSignup}>회원가입</GrayButton>
            </ButtonWrapper>
            <NaviWrapper>
              <List onClick={() => handleListClick('/recipe')}>칵테일 레시피</List>
              <List onClick={() => handleListClick('/diy-recipe')}>DIY 칵테일</List>
              <List onClick={() => handleListClick('/mypage')}>마이페이지</List>
            </NaviWrapper>
          </>
        )}
      </SidebarContent>
    </Wrapper>
  );
}

export default SideBar;

const CloseIcon = styled.div`
  position: absolute;
  top: 25.5rem;
  right: 0.5rem;
  cursor: pointer;
  color: #d9d9d9;
  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const List = styled.p`
  cursor: pointer;
`;
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
`;

const NaviWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #000000;
  padding: 2rem;
  padding-right: 10rem;
  gap: 3rem;
`;

const ImgWrapper = styled.div`
  position: absolute;
  top: 28rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 3rem;
  padding-bottom: 2rem;
`;

const ProfileImg = styled.div`
  width: 8.25rem;
  height: 8.25rem;
  border-radius: 50%;
  background-color: #ffffff;
  background-image: url(${(props) => props.photo});
  background-size: 26rem;
  background-position: center center;
  margin-top: 30px;
`;

const SidebarContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  height: 100%;
  background-color: #ffffff;
  transform: translateX(0);
  transition: transform 0.3s;
  padding-top: 38rem;
`;
const LogoutButton = styled.button`
  position: absolute;
  bottom: 24.5rem;
  right: 1rem;
  padding: 8px 12px;
  font-size: 0.9em;
  border: none;
  background-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
