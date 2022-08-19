import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
   name: 'navigation',
   initialState: {
      lastUrl: ''
   },
   reducers: {
      setLastUrl(state, action) {
         state.lastUrl = action.payload
      }
   }
})
export const {setLastUrl} = navigationSlice.actions
export const navigationReducer = navigationSlice.reducer