import OSearch from '@components/organisms/Search';
import type { ISong } from '@core/domain/models/song';
import { SongInstance } from '@core/infras/instances/songInstance';
import { useAppDispatch } from '@store/store';
import { safelyParseJSON } from '@utils/json';
import type { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { addSong } from 'src/store/reducer/songSlice';

const MAX_LIST = 10;

const Search = () => {
  const dispatch = useAppDispatch();

  const isAbortRef = useRef<boolean>(false);

  const [keyword, setKeyword] = useState('');
  const [listSongs, setListSongs] = useState<ISong[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback((value: string) => {
    setListSongs([]);
    if (value) {
      setKeyword(value);
    }
  }, []);

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
      if (!keyword) return;

      setIsSearching(true);

      try {
        const songs = await SongInstance.getSongByKeyword(keyword, config);

        setListSongs(songs?.slice(0, MAX_LIST));
        setIsSearching(false);
      } catch (error: any) {
        if (error?.code === 'ERR_CANCELED') {
          isAbortRef.current = true;
        }
      } finally {
        if (!isAbortRef.current) {
          setIsSearching(false);
        }
      }
    },
    []
  );

  useEffect(
    function fetchLastRequest() {
      const controller = new AbortController();

      handleGetSongByKeyword(keyword, {
        signal: controller.signal,
      });

      return () => {
        controller.abort();
      };
    },
    [handleGetSongByKeyword, keyword]
  );

  useEffect(() => () => setListSongs([]), []);

  return (
    <OSearch
      loading={isSearching}
      listSongs={listSongs}
      onSearch={handleSearch}
      onClickSong={handleClickSong}
    />
  );
};

export default Search;
