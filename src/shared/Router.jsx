import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddBoard from '../pages/AddBoard';
import DIYPage from '../pages/DIYPage';
import Main from '../pages/Main';
import DetailRecipe from '../pages/DetailRecipe';
import Layout from './Layout';
import BoardRecipe from '../pages/BoardRecipe';
import Search from '../pages/Search';

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/diy-recipe" element={<DIYPage />} />
        <Route path="/add-board" element={<AddBoard />} />
        <Route path="/recipe" element={<BoardRecipe />} />
        <Route path="/recipe/:id" element={<DetailRecipe />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default Router;
