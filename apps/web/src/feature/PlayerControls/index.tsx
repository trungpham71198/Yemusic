import PlayerControlsCpn from '@components/organisms/PlayerControls';
import { setCurrent } from '@store/reducer/songSlice';
import type { FC } from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/store';

interface IProps {
  device: 'mobile' | 'desktop';
}

export const PlayerControls: FC<IProps> = ({ device }) => {
  const dispatch = useAppDispatch();
  const { playList: playListSelector, current } = useAppSelector(
    state => state.song
  );

  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const songCurrent = playListSelector[current];

  const handleToggleSuffle = () => {};

  const handleSkipNext = () => {
    let currNew = current + 1;
    if (currNew >= playListSelector.length) {
      currNew = 0;
    }
    dispatch(setCurrent(currNew));
  };

  const handleSkipPrevious = () => {
    let currNew = current - 1;
    if (currNew < 0) {
      currNew = playListSelector.length - 1;
    }
    dispatch(setCurrent(currNew));
  };

  const handleEndPlay = () => {};

  if (!songCurrent) return null;
  return (
    <PlayerControlsCpn
      dataSource={songCurrent}
      isLoading={isLoading}
      isShuffle={isShuffle}
      onShuffle={handleToggleSuffle}
      onNext={handleSkipNext}
      onPrevious={handleSkipPrevious}
      onEnded={handleEndPlay}
    />
  );
};
