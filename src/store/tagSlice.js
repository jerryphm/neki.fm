import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   tags: [],
   tagTopAlbums: null,
   tagTopArtists: null,
   tagTopTracks: null,
};

const tagSlice = createSlice({
   name: 'tag',
   initialState,
   reducers: {
      setTags(state, action) {
         state.tags = action.payload;
      },
      setTagTopAlbums(state, action) {
         state.tagTopAlbums = action.payload;
      },
      setTagTopArtists(state, action) {
         state.tagTopArtists = action.payload;
      },
      setTagTopTracks(state, action) {
         state.tagTopTracks = action.payload;
      },
   },
});

export const tagSelector = state => state.tag
export const {setTags, setTagTopAlbums, setTagTopArtists, setTagTopTracks} = tagSlice.actions
export const tagReducer = tagSlice.reducer
