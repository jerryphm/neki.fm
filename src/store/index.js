import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { playerReducer } from './playerSlice';
import { searchReducer } from './searchSlice';
import { tagReducer } from './tagSlice';
import {trendingReducer} from './trendingSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      search: searchReducer,
      tag: tagReducer,
      player: playerReducer,
      trending: trendingReducer
   },
});
export default store;
