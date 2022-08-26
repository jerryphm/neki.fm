import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   top1Song: null
}
const trendingSlice = createSlice({
   name: 'trending',
   initialState,
   reducers: {
      setTop1Song(state, action) {
         state.top1Song = action.payload
      }
   }
})
export const trendingSelector = state => state.trending
export const {setTop1Song} = trendingSlice.actions
export const trendingReducer = trendingSlice.reducer