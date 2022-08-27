import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   favArtists: null,
   artists: null
}

const artistSlice = createSlice({
   name: 'artist',
   initialState,
   reducers: {
      setFavArtists(state, action) {
         state.favArtists = action.payload
      },
      setArtists(state,action) {
         state.artists = action.payload
      }
   }
})
export const artistSelector = state => state.artist
export const {setFavArtists, setArtists} = artistSlice.actions
export const artistReducer = artistSlice.reducer