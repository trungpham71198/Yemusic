import SongCard, { SongCardList } from '@components/organisms/Songs';
import type { ISong } from '@core/domain/models/song';
import { SongInstance } from '@core/infras/instances/songInstance';
import type { ISongState } from '@store/reducer/songSlice';
import { addSong, addSongTrending } from '@store/reducer/songSlice';
import { useAppDispatch, useAppSelector } from '@store/store';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';

const dataOnLoading = Array(10)
  .fill({})
  .map((_item, index) => ({
    yId: index.toString(),
    title: '',
    duration: '',
    thumbnail: {
      url: '',
      width: 40,
      height: 40,
    },
    channel: '',
    view: '',
    publishedAt: '',
  }));

const Home: FC = () => {
  const {
    playList: playListSelect,
    current,
    playListTrending: playListTrendingInit,
  } = useAppSelector((state: { song: ISongState }) => state.song);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [playList, setPlayList] = useState<ISong[] | []>(
    playListTrendingInit || []
  );

  const isPlaying = useCallback(
    (yId: string) => {
      if (current !== null) {
        return playListSelect[current]?.yId === yId;
      }
      return false;
    },
    [current, playListSelect]
  );

  const handleChooseSong = async (song: ISong) => {
    if (isPlaying(song.yId) || playListSelect.some(s => s.yId === song.yId))
      return;

    const durationSecondsFormat = song.duration
      .split(':')
      .reduce(
        (acc: number, cur: string, durationIndex) =>
          acc + (durationIndex === 0 ? Number(cur) * 60 : Number(cur)),
        0
      );
    const payloadAudio = await SongInstance.getAudioBySongId(song.yId);

    dispatch(
      addSong({
        ...song,
        duration: String(durationSecondsFormat),
        audioUrl: payloadAudio.audioUrl,
        isPlayed: true,
        position: 'first',
      })
    );
  };

  const handleDownloadSong = (yId: string, songName: string) => {
    const href = `https://yemusic-api.vc-team.com/api/song/${yId}/download`;
    const link = document.createElement('a');

    link.href = href;
    link.setAttribute('target', '_blank');
    link.setAttribute('download', `${songName}.mp3`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const getSongTrending = useCallback(async () => {
    const songsTrending = await SongInstance.getSongTrending();
    setPlayList(songsTrending);
    setIsLoading(false);
    dispatch(addSongTrending(songsTrending));
  }, [dispatch]);

  useEffect(() => {
    if (!playListTrendingInit.length) {
      setIsLoading(true);
      getSongTrending();
    }
  }, [getSongTrending, playListTrendingInit.length]);

  const playListTrending = isLoading ? dataOnLoading : playList;

  return (
    <div className='p-home'>
      {/* <SongCardList title='Top 30' viewMode='list' isLoading={isLoading}>
        {playListTrending?.map(song => (
          <SongCard
            key={song.yId}
            author={song.channel}
            duration={song.duration}
            title={song.title}
            imageSrc={song.thumbnail.url}
            isLiked={false}
            isPlaying={isPlaying(song.yId)}
            onClick={() => handleChooseSong(song)}
            onClickLike={() => console.log('song card liked')}
            onClickDownload={() => handleDownloadSong(song.yId, song.title)}
          />
        ))}
      </SongCardList> */}
    </div>
  );
};

export default Home;
