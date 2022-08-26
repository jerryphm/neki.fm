import { createSlice } from '@reduxjs/toolkit';

//last.FM doesn't support streaming music so I did this way:
//step 1 _ use 'YouTube Data API v3' to get video id
//step 2 _ play music through 'Iframe Player API' with the given id from step 1

//actually, I read docs and wrote code by this way.
//but after that, I realized Youtube Data API sets a limit call
//10000 "quotas" - my service will consume 100 for a calling => 1500 for whole process :(, so I will hardcode in step 1 with array of video IDs.

const initialState = {
   trackIds: [
      '09R8_2nJtjg',
      'PVjiKRfKpPI',
      'Ss8t7a8n0U4',
      'kECZnPrIufo',
      'Lv8VKCz3Cdg',
      'lfkgOWrd1vc',
      'OOmjvf0FICk',
      'tt2k8PGm-TI',
      'DKuDnvi81iY',
      'NFnIuBB9YAo',
      'wDjeBNv6ip0',
      'L3wKzyIN1yk',
      '0vyUlO3qgLg',
      'y0rTljyiq9w',
      '5pm4Vu3Z3Nw',
   ],
   isPlaying: false,
   trackPosition: 0,
   videoInfo: ''
};
const playerSlice = createSlice({
   name: 'player',
   initialState,
   reducers: {
      setTrackIds(state, action) {
         state.trackIds = action.payload;
      },
      setTrackPosition(state, action) {
         state.trackPosition = action.payload;
      },
      setIsPlaying(state, action) {
         state.isPlaying = action.payload;
      },
      setVideoInfo(state, action) {
         state.videoInfo = action.payload
      }
   },
});
export const playerSelector = (state) => state.player;
export const { setTrackIds, setTrackPosition, setIsPlaying, setVideoInfo } =
   playerSlice.actions;
export const playerReducer = playerSlice.reducer;
