import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { searchReducer } from './search/searchSlice';
import { tagReducer } from './tag/tagSlice';

const store = configureStore({
   reducer: {
      auth: authReducer,
      search: searchReducer,
      tag: tagReducer,
   },
});
export default store;
