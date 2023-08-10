import React from 'react';
import { useLocation } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const filteredData = location.state.cocktails;
  //   console.log(filteredData);
  return <div>{filteredData}</div>;
}

export default Search;
