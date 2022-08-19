import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import App from '../App';
import { Home, Trend, Genres, Songs, NotFound } from '../pages';
import Search from '../components/search/Search';

function routeCmp() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<App />}>
               <Route index element={<Home />}></Route>
               <Route path='search' element={<Search />}></Route>
               <Route path='trend' element={<Trend />}></Route>
               <Route path='genres' element={<Genres />}></Route>
               <Route path='songs' element={<Songs />}></Route>
               <Route path='*' element={<NotFound />}></Route>
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default routeCmp;
