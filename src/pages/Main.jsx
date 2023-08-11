import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getCocktailData, getDIYData } from '../api/recipeData';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';

function Main() {
  const navigate = useNavigate();

  const { data: diyData } = useQuery('fetchDIYData', getDIYData);
  const { data: cocktailData } = useQuery('fetchCocktailData', getCocktailData);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <>
      <h1 style={{ fontSize: '24px', color: '#ffffff', marginTop: '2rem', marginLeft: '2rem' }}>인기 레시피</h1>
      {cocktailData && (
        <div>
          <Carousel autoPlay autoPlaySpeed={2000} responsive={responsive} infinite={true}>
            {cocktailData.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    margin: '3rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                  }}
                >
                  <img
                    src={item.imgurl}
                    style={{
                      width: '14rem',
                      height: '14rem',
                      borderRadius: '100%',
                      objectFit: 'cover',
                      marginBottom: '2rem'
                    }}
                  />
                  <p style={{ fontSize: '20px', marginBottom: '1rem', color: '#ffffff' }}>{item.krName}</p>
                </div>
              );
            })}
          </Carousel>
        </div>
      )}

      <h1 style={{ fontSize: '24px', color: '#ffffff', marginTop: '2rem', marginLeft: '2rem' }}>DIY 레시피</h1>
      <StDIYWrapper>
        {diyData?.map((item) => (
          <StDIYItem
            key={item.id}
            onClick={() => {
              navigate(`/diy-recipe/${item.id}`);
              window.scrollTo(0, 0);
            }}
          >
            <StImageWrapper>
              <img src={item.image} alt={item.name} />
            </StImageWrapper>
            <StName>{item.name}</StName>
          </StDIYItem>
        ))}
      </StDIYWrapper>
    </>
  );
}

export default Main;

const StCarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  img {
    width: 14rem;
    height: 14rem;
    border-radius: 100%;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  p {
    font-size: 20px;
    margin-bottom: 1rem;
    color: #ffffff;
  }
`;

const StDIYWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 1.5rem;
  padding: 2rem;
`;

const StDIYItem = styled.div`
  background-color: white;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 10px;
  min-height: 10px;
  max-width: 400px;
  max-height: 800px;
`;

const StImageWrapper = styled.div`
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    overflow: hidden;
    max-height: 300px;
  }
`;

const StName = styled.h2`
  margin: 0;
  padding: 1rem;
`;
