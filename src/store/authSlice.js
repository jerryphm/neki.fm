import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isAuthorized: false,
   api_key: 'e316df1ddbb64cad4e645286042b7d5d',
   secret: 'c7524f3b10d0c25934b6af0cecbb5cea',
   token: '',
   api_sig: '',
   sk: '',
   userInfo: '',
};
const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setToken(state, action) {
         state.token = action.payload;
      },
      setAuthorized(state, action) {
         state.isAuthorized = action.payload;
      },
      setApiSig(state, action) {
         state.api_sig = action.payload;
      },
      setSk(state, action) {
         state.sk = action.payload;
      },
      setUserInfo(state, action) {
         state.userInfo = action.payload;
      },
   },
});
export const authSelector = (state) => state.auth;
export const { setToken, setAuthorized, setApiSig, setSk, setUserInfo } =
   authSlice.actions;
export const authReducer = authSlice.reducer;
