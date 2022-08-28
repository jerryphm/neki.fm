import { createSlice } from '@reduxjs/toolkit';


const initialState = {
   albums : null
}

const albumSlice = createSlice({
   name: 'album',
   initialState,
   reducers: {
      setAlbums(state, action) {
         state.albums = action.payload
      }
   }
})
export const albumSelector = state => state.album
export const {setAlbums} = albumSlice.actions
export const albumReducer = albumSlice.reducer