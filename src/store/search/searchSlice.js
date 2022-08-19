import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   albums: null,
   artists: null,
   tracks: null,
   searchTerm: ''
};

const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
      setAlbums(state, action) {
         state.albums = action.payload;
      },
      setArtists(state, action) {
         state.artists = action.payload;
      },
      setTracks(state, action) {
         state.tracks = action.payload;
      },
      setSearchTerm(state, action) {
         state.searchTerm = action.payload;
      },
   
   },
});

export const searchSelector = (state) => state.search;
export const { setAlbums, setArtists, setTracks, setSearchTerm } =
   searchSlice.actions;
export const searchReducer = searchSlice.reducer;
