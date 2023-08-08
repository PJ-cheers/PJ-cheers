import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

// 아이콘
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../pages/SideBar';

function Layout() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
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
          <Link to="/">로그인</Link>
          <Link to="/">회원가입</Link>
          <FontAwesomeIcon style={{ fontSize: '24px' }} icon={faBars} onClick={toggleSidebar} />
        </HeaderRight>
      </Header>
      {sidebarVisible && <SideBar onClose={toggleSidebar} />}
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
