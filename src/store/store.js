import { configureStore } from '@reduxjs/toolkit';
import {authReducer} from './auth/authSlice'
import { navigationReducer } from './navigation/navigationSlice';

const store = configureStore({
   reducer: {
      auth: authReducer,
      navigation: navigationReducer,
   },
});
export default store;