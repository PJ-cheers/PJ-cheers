import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import DetailRecipe from '../pages/DetailRecipe';
import Layout from './Layout';

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/recipe/:id" element={<DetailRecipe />} />
      </Route>
    </Routes>
  );
}

export default Router;
