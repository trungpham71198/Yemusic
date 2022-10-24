import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IPlayerControls } from '@core/domain/models/song';
import { ISong } from '@core/domain/models/song';

interface SongState {
  playList: IPlayerControls[];
  playListTrending: ISong[];
  current: number;
}

interface IAddSong extends IPlayerControls {
  position?: 'first' | 'last';
}

const initialState: SongState = {
  playList: [],
  current: 0,
  playListTrending: [],
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
    addSong: (state, action: PayloadAction<IAddSong>) => {
      let payload = [...state.playList, action.payload];

      if (action.payload.position === 'first') {
        payload = [action.payload, ...state.playList];
        state.current = 0;
      }
      state.playList = payload;
    },
    addSongTrending: (state, action: PayloadAction<ISong[]>) => {
      state.playListTrending = action.payload;
    },
  },
});

export const { addSong, setCurrent, addSongTrending } = songSlice.actions;

export const selectPlayList = (state: RootState) => state.song;

export default songSlice.reducer;
