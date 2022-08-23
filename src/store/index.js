import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { searchReducer } from './searchSlice';
import { tagReducer } from './tagSlice';

const store = configureStore({
   reducer: {
      auth: authReducer,
      search: searchReducer,
      tag: tagReducer,
   },
});
export default store;
