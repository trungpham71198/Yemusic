import OSearch from '@components/organisms/Search';
import type { ISong } from '@core/domain/models/song';
import { SongInstance } from '@core/infras/instances/songInstance';
import { useAppDispatch } from '@store/store';
import { safelyParseJSON } from '@utils/json';
import type { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { addSong } from 'src/store/reducer/songSlice';

interface ISongs {
  list: ISong[];
  isSearching?: boolean;
}

const MAX_LIST = 10;

const Search = () => {
  const dispatch = useAppDispatch();

  const isAbortRef = useRef<boolean>(false);

  const [state, setState] = useState({
    keyword: '',
  });
  const [songs, setSongs] = useState<ISongs>({
    list: [],
    isSearching: false,
  });

  const handleToggleSearching = (isSearching: boolean) => {
    setSongs(prev => ({
      ...prev,
      isSearching,
    }));
  };

  const handleAddRecentSong = (song: ISong) => {
    const oldRecentSongs: ISong[] = safelyParseJSON(
      localStorage.getItem('recent') || '[]',
      []
    );

    const indexOfSongInOldRecent = oldRecentSongs.findIndex(
      item => item.yId === song.yId
    );

    if (indexOfSongInOldRecent === -1) {
      localStorage.setItem(
        'recent',
        JSON.stringify([...oldRecentSongs, song].slice(-MAX_LIST).reverse())
      );
    } else {
      oldRecentSongs.splice(indexOfSongInOldRecent, 1);

      localStorage.setItem(
        'recent',
        JSON.stringify([...oldRecentSongs, song].slice(-MAX_LIST).reverse())
      );
    }
  };

  const handleClickSong = async (song: ISong) => {
    handleAddRecentSong(song);

    const payloadAudio = await SongInstance.getAudioBySongId(song.yId);

    if (payloadAudio?.audioUrl) {
      dispatch(
        addSong({ ...song, audioUrl: payloadAudio.audioUrl, isPlayed: true })
      );
    }
  };

  const handleGetSongByKeyword = useCallback(
    async (keyword: string, config?: AxiosRequestConfig) => {
      handleToggleSearching(true);

      try {
        const songs = await SongInstance.getSongByKeyword(keyword, config);

        setSongs(prev => ({
          ...prev,
          isSearching: false,
          list: songs?.slice(0, MAX_LIST),
        }));
      } catch (error: any) {
        if (error?.code === 'ERR_CANCELED') {
          isAbortRef.current = true;
        }
      } finally {
        if (!isAbortRef.current) {
          handleToggleSearching(false);
        }
      }
    },
    []
  );

  const handleOnSearch = (keyword: string) => {
    setState(prev => ({
      ...prev,
      keyword,
    }));
  };

  useEffect(
    function fetchLastRequest() {
      const controller = new AbortController();

      handleGetSongByKeyword(state.keyword, {
        signal: controller.signal,
      });

      return () => {
        controller.abort();
      };
    },
    [handleGetSongByKeyword, state.keyword]
  );

  return (
    <OSearch
      loading={songs.isSearching}
      listSongs={songs.list}
      onSearch={handleOnSearch}
      onClickSong={handleClickSong}
    />
  );
};

export default Search;
