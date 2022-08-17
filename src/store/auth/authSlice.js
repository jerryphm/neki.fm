import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isAuthorized: false,
   api_key: 'fad3f80f9f436c3798263b87553f645d',
   secret: '57f55113dfa056a3e58b95abf0d62bbe',
   token: '',
   api_sig: '',
   sk: '',
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
   },
});
export const authSelector = (state) => state.auth;
export const { setToken, setAuthorized, setApiSig, setSk } = authSlice.actions;
export const authReducer = authSlice.reducer;
