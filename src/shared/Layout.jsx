import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import Login from '../components/Login';
import { useState } from 'react';
import Signup from '../components/Signup';

// 아이콘
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import UserEdit from '../components/UserEdit';

function Layout() {
  const [loginIsModalOpen, setLoginIsModalOpen] = useState(false);
  const [signupIsModalOpen, setSignupIsModalOpen] = useState(false);
  const [userEditIsModalOpen, setUserEditIsModalOpen] = useState(false);

  const loginOpenModal = () => setLoginIsModalOpen(true);
  const loginCloseModal = () => setLoginIsModalOpen(false);
  const signupOpenModal = () => setSignupIsModalOpen(true);
  const signupCloseModal = () => setSignupIsModalOpen(false);
  const userEditModalOpen = () => setUserEditIsModalOpen(true);
  const userEditCloseModal = () => setUserEditIsModalOpen(false);
  return (
    <>
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
          <LoginButton onClick={loginOpenModal}>로그인</LoginButton>
          <Login isOpen={loginIsModalOpen} closeModal={loginCloseModal} />
          <SignupButton onClick={signupOpenModal}>회원가입</SignupButton>
          <Signup isOpen={signupIsModalOpen} closeModal={signupCloseModal} />
          <UserEditButton onClick={userEditModalOpen}>회원정보 수정</UserEditButton>
          <UserEdit isOpen={userEditIsModalOpen} closeModal={userEditCloseModal} />
          <FontAwesomeIcon icon={faBars} />
        </HeaderRight>
      </Header>
      <Outlet />
      <footer></footer>
    </>
  );
}

export default Layout;

const Header = styled.header`
  width: 100vw;
  height: 100px;
  padding: 0 1rem 0 1rem;
  background-color: #000000;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  & > :nth-child(-n + 2) {
    text-decoration: none;
    color: white;
  }
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
