import App from './App';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import {
   Home,
   Search,
   Trend,
   NotFound,
   ArtistHome,
   Artist,
   Album,
   AlbumHome,
} from './pages';
import { SearchHome, Result, Tag } from './pages/search';
import {ContentNotFound} from './common'

function RouteManager() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<App />}>
               {/* Home */}
               <Route index element={<Home />}></Route>
               {/* Search */}
               <Route path='search' element={<Search />}>
                  <Route index element={<SearchHome />}></Route>
                  <Route path='tag' element={<Outlet />}>
                     <Route path=':tagKeyWord' element={<Tag />} />
                  </Route>
                  <Route path=':resultKeyWord' element={<Result />} />
                  <Route path='notfound' element={<ContentNotFound />} />
               </Route>
               {/* Trend */}
               <Route path='trend' element={<Trend />}></Route>
               {/* Aritsts */}
               <Route path='artists' element={<Outlet />}>
                  <Route index element={<ArtistHome />} />
                  <Route path=':artistName' element={<Artist />} />
               </Route>
               {/* Albums */}
               <Route path='albums' element={<Outlet />}>
                  <Route index element={<AlbumHome />} />
                  <Route path=':albumInfo' element={<Album />} />
                  <Route path='notfound' element={<ContentNotFound />} />
               </Route>
               {/* Not found */}
               <Route path='*' element={<NotFound />}></Route>
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default RouteManager;
