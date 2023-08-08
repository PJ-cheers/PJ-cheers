import React from 'react';
import styled from 'styled-components';

function SideBar({ onClose }) {
  return (
    <Wrapper onClick={onClose}>
      <SidebarContent onClick={(e) => e.stopPropagation()}>SideBar</SidebarContent>
    </Wrapper>
  );
}

export default SideBar;

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

const SidebarContent = styled.div`
  width: 30rem;
  height: 100%;
  background-color: #000000;
  transform: translateX(0);
  transition: transform 0.3s;
`;
