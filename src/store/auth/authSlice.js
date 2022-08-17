import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isAuthorized: false,
   apiKey: 'fad3f80f9f436c3798263b87553f645d',
   secret: '57f55113dfa056a3e58b95abf0d62bbe',
   token: ''
}
const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setToken(state, action) {
         state.token = action.payload
      },
      setAuthorized(state, action) {
         state.isAuthorized = action.payload
      }
   }
})
export const authSelector = (state) => state.auth
export const {setToken, setAuthorized} = authSlice.actions
export const authReducer = authSlice.reducer

/**
 * 
 * b1: 
 * _ th1: 
 */