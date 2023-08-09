import React from 'react'
import { getDIYData } from '../api/recipeData';
import { useQuery } from 'react-query';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

function DIYPage() {
  const navigate = useNavigate();
  const { data: diyData } = useQuery('fetchDIYData', getDIYData);
  return (
    <>
    <h1 style={{ fontSize: '24px' }}>DIY 레시피</h1>
    <div
        style={{
          backgroundColor: '#d9d9d9',
          width: '100%',
          display: 'flex'
        }}
      >
        {diyData?.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                border: '1px solid black',
                margin: '1rem',
                width: '15rem',
                position: 'relative'
              }}
            >
              <img
                src={item.image}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
              <h2 style={{ margin: '1rem 0' }}>칵테일 이름: {item.krName}({item.enName})</h2>
              {/* <p style={{ margin: '0.5rem 0' }}>레시피 : {item.recipe}</p> */}
              <p style={{ margin: '0.5rem 0' }}>바텐더 : {item.user}</p>
            </div>
          );
        })}
      </div>
      <ButtonContainer>
        <AddButton onClick={() => {navigate("/add-board")}}>+</AddButton>
      </ButtonContainer>
    </>
  )
}

export default DIYPage;

const ButtonContainer = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 9.5rem;
`
const AddButton = styled.button`
  font-weight: bold;
  font-size: 15px;
  padding :15px 19px;
  background-color: var(--color-black);
  color: var(--color-white);
  border: 1px solid var(--color-white);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
&:hover{
  color : var(--color-gray);
}
`
