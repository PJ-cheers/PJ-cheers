import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddBoard from '../pages/AddBoard';
import EditBoard from '../pages/EditBoard';
import DIYPage from '../pages/DIYPage';
import Main from '../pages/Main';
import DetailRecipe from '../pages/DetailRecipe';
import Layout from './Layout';
import BoardRecipe from '../pages/BoardRecipe';
import NotFoundPage from '../pages/NotFoundPage';
import Search from '../pages/Search';
import MyPage from '../pages/MyPage';
import DIYdetail from '../pages/DIYdetail';

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/diy-recipe" element={<DIYPage />} />
        <Route path="/diy-recipe/:id" element={<DIYdetail />} />
        <Route path="/add-board" element={<AddBoard />} />
        <Route path="/edit-board/:id" element={<EditBoard />} />
        <Route path="/recipe" element={<BoardRecipe />} />
        <Route path="/recipe/:id" element={<DetailRecipe />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
