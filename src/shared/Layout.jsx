import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import Login from '../components/Login';
import Signup from '../components/Signup';

// 아이콘
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../pages/SideBar';
import UserEdit from '../components/UserEdit';

function Layout() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  // login, signup, edit
  const handleOpenModal = (type) => {
    if (!modalType) {
      setModalType(type);
    }
  };

  const handleCloseModal = () => {
    setModalType('');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <div style={{ padding: '6rem 0' }}>
      <Header>
        <Link to="/">
          <ImgLogo src="img/cheers_logo_white.png" alt="logoImage"></ImgLogo>
        </Link>
        <HeaderMiddle>
          <input type="text" placeholder="검색어를 입력해 주세요"></input>
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </HeaderMiddle>
        <HeaderRight>
          <LoginButton onClick={() => handleOpenModal('login')}>로그인</LoginButton>
          <SignupButton onClick={() => handleOpenModal('signup')}>회원가입</SignupButton>
          <UserEditButton onClick={() => handleOpenModal('edit')}>회원정보 수정</UserEditButton>
          <FontAwesomeIcon style={{ fontSize: '24px' }} icon={faBars} onClick={toggleSidebar} />
        </HeaderRight>
      </Header>
      <ScrollContainer>
        <TopButton onClick={scrollToTop}>Top</TopButton>
      </ScrollContainer>
      {sidebarVisible && <SideBar onClose={toggleSidebar} />}
      <Outlet />
      <Login isOpen={modalType === 'login'} closeModal={() => handleCloseModal()} />
      <Signup isOpen={modalType === 'signup'} closeModal={() => handleCloseModal()} />
      <UserEdit isOpen={modalType === 'edit'} closeModal={() => handleCloseModal()} />
      <Footer>
        <Link to="/">
          <ImgNotion src="img/notion_logo_white.png" alt="notionImage"></ImgNotion>
        </Link>
        <p>
          © 2023 <img src="img/cheers_logo_white.png" alt="logoImage" style={{ width: '4rem' }} /> by 김채현 이지원
          전대현 정봉호
        </p>
        <Link to="https://github.com/PJ-cheers/PJ-cheers">
          <FontAwesomeIcon icon={faGithub} size="xl" />
        </Link>
      </Footer>
    </div>
  );
}

export default Layout;

const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 40;
  width: 100vw;
  height: 6rem;

  background-color: #000000;
  color: #fff;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & > :first-child {
    margin-left: 1rem;
  }
  & > :last-child {
    margin-right: 1rem;
  }
`;

const ImgLogo = styled.img`
  width: 8rem;
  height: 2rem;
`;

const HeaderMiddle = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  width: 40rem;

  & > input {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 3rem;
  }

  & > button {
    border: none;
    background-color: #fff;
    position: absolute;
    right: 10px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 1rem;

  & > :nth-child(n + 1) {
    cursor: pointer;
  }

  & > :nth-child(-n + 2) {
    text-decoration: none;
    color: white;
  }
`;

const Footer = styled.footer`
  z-index: 20;
  width: 100vw;
  height: 4rem;
  position: fixed;
  bottom: 0px;
  background-color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  & > :first-child {
    margin-left: 2rem;
  }
  & > :last-child {
    margin-right: 2rem;
    color: #fff;
  }
`;

const ImgNotion = styled.img`
  width: 1.5rem;
`;

const LoginButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ffffff;
`;

const SignupButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ffffff;
`;

const UserEditButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ffffff;
`;

const ScrollContainer = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 6rem;
  z-index: 5;
`;
const TopButton = styled.button`
  font-weight: bold;
  font-size: 15px;
  padding: 15px 10px;
  background-color: var(--color-black);
  color: var(--color-white);
  border: 1px solid var(--color-white);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  &:hover {
    color: var(--color-gray);
  }
`;
