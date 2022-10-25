import type { IPlayerControls, ISong } from '@core/domain/models/song';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export interface ISongState {
  playList: IPlayerControls[];
  playListTrending: ISong[];
  current: number;
}

interface IAddSong extends IPlayerControls {
  position?: 'first' | 'last';
}

const initialState: ISongState = {
  playList: [],
  current: 0,
  playListTrending: [],
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setCurrent: (state: ISongState, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
    addSong: (state: ISongState, action: PayloadAction<IAddSong>) => {
      let payload = [...state.playList, action.payload];

      if (action.payload.position === 'first') {
        payload = [action.payload, ...state.playList];
        state.current = 0;
      }
      state.playList = payload;
    },
    addSongTrending: (state: ISongState, action: PayloadAction<ISong[]>) => {
      state.playListTrending = action.payload;
    },
  },
});

export const { addSong, setCurrent, addSongTrending } = songSlice.actions;

export const selectPlayList = (state: RootState) => state.song;

export default songSlice.reducer;
