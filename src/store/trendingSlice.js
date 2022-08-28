import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   top1Song: null,
   artists: null,
   tracks: null,
   tags: null,
};
const trendingSlice = createSlice({
   name: 'trending',
   initialState,
   reducers: {
      setTop1Song(state, action) {
         state.top1Song = action.payload;
      },
      setArtists(state, action) {
         state.artists = action.payload;
      },
      setTracks(state, action) {
         state.tracks = action.payload;
      },
      setTags(state, action) {
         state.tags = action.payload;
      },
   },
});
export const trendingSelector = (state) => state.trending;
export const { setTop1Song, setArtists, setTracks, setTags } =
   trendingSlice.actions;
export const trendingReducer = trendingSlice.reducer;
