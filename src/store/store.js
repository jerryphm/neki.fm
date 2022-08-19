import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { searchReducer } from './search/searchSlice';

const store = configureStore({
   reducer: {
      auth: authReducer,
      search: searchReducer,
   },
});
export default store;
