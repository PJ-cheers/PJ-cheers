import React from 'react';
import styled from 'styled-components';
import { GrayButton } from '../shared/Buttons';
import { useNavigate } from 'react-router-dom';

function SideBar({ onClose, onLogin, onSignup }) {
  const navigate = useNavigate();
  return (
    <Wrapper onClick={onClose}>
      <SidebarContent onClick={(e) => e.stopPropagation()}>
        <ImgWrapper>
          <ProfileImg />
        </ImgWrapper>
        <ButtonWrapper>
          <GrayButton onClick={onLogin}>로그인</GrayButton>
          <GrayButton onClick={onSignup}>회원가입</GrayButton>
        </ButtonWrapper>
        <NaviWrapper>
          <List
            onClick={() => {
              navigate('/recipe');
            }}
          >
            칵테일 레시피
          </List>
          <List
            onClick={() => {
              navigate('/board');
            }}
          >
            DIY 칵테일
          </List>
          <List
            onClick={() => {
              navigate('/mypage');
            }}
          >
            마이페이지
          </List>
        </NaviWrapper>
      </SidebarContent>
    </Wrapper>
  );
}

export default SideBar;

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

const ProfileImg = styled.img`
  background-color: black;
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
`;

const SidebarContent = styled.div`
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
