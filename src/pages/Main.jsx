import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getCocktailData, getDIYData } from '../api/recipeData';
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
          <Carousel autoPlay autoPlaySpeed={2000} responsive={responsive}>
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
      <div
        style={{
          width: '100%',
          display: 'flex'
        }}
      >
        {diyData?.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid black',
                margin: '1rem',
                width: '20rem',
                height: '24rem',
                position: 'relative'
              }}
            >
              <img
                src={item.image}
                style={{
                  width: '10rem',
                  height: '10rem',
                  borderRadius: '100%',
                  objectFit: 'cover',
                  margin: '2rem 4.5rem 0'
                }}
              />
              <h2 style={{ margin: '2rem 0' }}>{item.name}</h2>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Main;
