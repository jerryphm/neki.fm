import {createSlice} from '@reduxjs/toolkit'
const initialState = {
   lovedSongs: null
}
const lovedSongSlice = createSlice({
   name: 'lovedSongs',
   initialState,
   reducers: {
      setLovedSongs(state, action) {
         state.lovedSongs = action.payload
      }
   }
})
export const lovedSongSelector = state => state.lovedSongs
export const {setLovedSongs} = lovedSongSlice.actions
export const lovedSongReducer = lovedSongSlice.reducer