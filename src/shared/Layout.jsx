import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

// 아이콘
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';

function Layout() {
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
          <FontAwesomeIcon icon={faBars} />
        </HeaderRight>
      </Header>
      <Outlet />
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
    </>
  );
}

export default Layout;

const Header = styled.header`
  position: relative;
  top: 0;
  z-index: 20;
  width: 100vw;
  height: 100px;
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
  & > :nth-child(-n + 2) {
    text-decoration: none;
    color: white;
  }
`;

const Footer = styled.footer`
  z-index: 20;
  width: 100vw;
  height: 70px;
  position: absolute;
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
