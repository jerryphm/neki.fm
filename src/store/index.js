import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { playerReducer } from './playerSlice';
import { searchReducer } from './searchSlice';
import { tagReducer } from './tagSlice';

const store = configureStore({
   reducer: {
      auth: authReducer,
      search: searchReducer,
      tag: tagReducer,
      player: playerReducer,
   },
});
export default store;
