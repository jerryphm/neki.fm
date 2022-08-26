import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   tags: null,
   homeTags: null,
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
      setHomeTags(state, action) {
         state.homeTags = action.payload;
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
export const {setTags, setTagTopAlbums, setTagTopArtists, setTagTopTracks, setHomeTags} = tagSlice.actions
export const tagReducer = tagSlice.reducer
