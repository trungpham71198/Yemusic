import { useState } from 'react';

import { ISong } from '@core/domain/models/song';
import { SongInstance } from '@core/infras/instances/songInstance';

import SearchCpn from '@common/components/organisms/Search';
import { useAppDispatch } from '@store/store';
import { addSong } from 'src/store/reducer/songSlice';

const Search = () => {
  const dispatch = useAppDispatch();

  const [songs, setSongs] = useState<ISong[]>([]);

  const handleClickChoose = async (data: ISong) => {
    const payloadAudio = await SongInstance.getAudioBySongId(data.yId);

    if (payloadAudio?.audioUrl) {
      dispatch(
        addSong({ ...data, audioUrl: payloadAudio.audioUrl, isPlayed: true })
      );
    }
  };
  const handleRemoveSongSearchRecent = (id: string | number) => {};

  const handleSearch = async (keyword: string) => {
    if (!keyword) return null;

    const resultSearch = await SongInstance.getSongByKeyword(keyword);
    setSongs(resultSearch);
  };

  return (
    <SearchCpn
      dataSource={songs}
      handleClickChoose={handleClickChoose}
      onSearch={handleSearch}
    />
  );
};

export default Search;
