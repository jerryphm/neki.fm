import { configureStore } from '@reduxjs/toolkit';
import { artistReducer } from './artistSlice';
import { authReducer } from './authSlice';
import { lovedSongReducer } from './lovedSongSlice';
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
      trending: trendingReducer,
      lovedSongs: lovedSongReducer,
      artist: artistReducer,
   },
});
export default store;
