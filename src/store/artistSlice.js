import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   favArtists: null,
}

const artistSlice = createSlice({
   name: 'artist',
   initialState,
   reducers: {
      setFavArtists(state, action) {
         state.favArtists = action.payload
      }
   }
})
export const artistSelector = state => state.artist
export const {setFavArtists} = artistSlice.actions
export const artistReducer = artistSlice.reducer