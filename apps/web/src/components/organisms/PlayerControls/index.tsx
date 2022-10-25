import './style.scss';

import {
  MoreIcon,
  PauseActiveIcon,
  PlayActiveIcon,
  RepeatIcon,
  RepeatOneIcon,
  ShuffleIcon,
  SkipNextActiveIcon,
  SkipPreviousActiveIcon,
} from '@components/atoms/Icon';
import ProgressBar from '@components/molecules/ProgressBar';
import type { IPlayerControls } from '@core/domain/models/song';
import { mapClassNameModifiers } from '@helper/style';
import { useViewport } from '@hooks/useViewport';
import { HHMMSS } from '@utils/formatTime';
import type { FC } from 'react';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type IViewMode = 'full' | 'mini';
export type IRepeatMode = 'none' | 'one' | 'all';

export interface IProps {
  dataSource: IPlayerControls;
  isLoading: boolean;
  isShuffle: boolean;
  onEnded: () => void;
  onShuffle: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

type TRenderButton =
  | 'pause'
  | 'play'
  | 'next'
  | 'previous'
  | 'repeat'
  | 'shuffle';

interface IRenderType {
  icon: React.ReactNode;
  className?: string;
  onclick: () => void;
}

export const PlayerControls: FC<IProps> = ({
  dataSource,
  isLoading,
  isShuffle,
  onEnded,
  onShuffle,
  onNext,
  onPrevious,
}) => {
  const { audioUrl, channel, title, thumbnail } = dataSource;
  const audioRef = useRef<HTMLAudioElement>(null);

  const { viewport } = useViewport();

  const [viewMode, setViewMode] = useState<IViewMode>('full');
  const [repeatMode, setRepeatMode] = useState<IRepeatMode>('none');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayed, setIsPlayed] = useState(false);

  const handleLoadMetadata = useCallback(
    (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
      setCurrentTime(0);
      setDuration((e.target as HTMLAudioElement).duration);
    },
    []
  );

  const handleUpdateTime = useCallback(
    (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
      setCurrentTime((e.target as HTMLAudioElement).currentTime);
    },
    []
  );

  const handleEnded = useCallback(() => {
    if (repeatMode === 'all') {
      onEnded();
    }

    if (repeatMode === 'none') {
      setCurrentTime(0);
      setIsPlayed(false);
    }
  }, [repeatMode]);

  const handleToggleMode = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    mode: IViewMode
  ) => {
    e.stopPropagation();
    setViewMode(mode);
  };

  const handlePlay = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlayed(true);
    }
  }, []);

  const handlePause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayed(false);
    }
  }, []);

  const handleToggleRepeatMode = useCallback(() => {
    const newRepeatMode =
      repeatMode === 'none' ? 'all' : repeatMode === 'all' ? 'one' : 'none';

    if (audioRef.current) {
      if (newRepeatMode === 'one') {
        audioRef.current.loop = true;
      } else {
        audioRef.current.loop = false;
      }
    }

    setRepeatMode(newRepeatMode);
  }, [repeatMode]);

  const handleChangeCurrentTime = useCallback((newCurrentTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newCurrentTime;
    }
    setCurrentTime(newCurrentTime);
  }, []);

  const handleSkipPrevious = () => {
    if (currentTime > 5 && audioRef.current) {
      audioRef.current.currentTime = 0;
    } else {
      onPrevious();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [audioUrl]);

  const renderTypeButton = (type: TRenderButton) => {
    const renderIconMode = {
      none: <RepeatIcon />,
      one: <RepeatOneIcon color='primary' />,
      all: <RepeatIcon color='primary' />,
    }[repeatMode];

    const renderType: { [k: string]: IRenderType } = {
      shuffle: {
        icon: <ShuffleIcon color={isShuffle ? 'primary' : 'secondary'} />,
        className: 'hidden',
        onclick: onShuffle,
      },
      previous: {
        icon: <SkipPreviousActiveIcon />,
        onclick: handleSkipPrevious,
      },
      pause: {
        icon: <PauseActiveIcon />,
        onclick: handlePause,
      },
      play: {
        icon: <PlayActiveIcon />,
        onclick: handlePlay,
      },
      next: {
        icon: <SkipNextActiveIcon />,
        onclick: onNext,
      },
      repeat: {
        icon: renderIconMode,
        className: 'hidden',
        onclick: handleToggleRepeatMode,
      },
    };
    const { icon, className, onclick } = renderType[type] || {};

    return (
      <button
        className={mapClassNameModifiers('o-playerControls__item', className)}
        data-loading='inherit'
        onClick={onclick}
        key={type}
      >
        {icon}
      </button>
    );
  };

  return (
    <div
      className={mapClassNameModifiers('o-playerControls', viewMode, viewport)}
      data-loading={isLoading}
      onClick={e => handleToggleMode(e, 'full')}
    >
      <audio
        className='o-playerControls__audio'
        src={audioUrl}
        ref={audioRef}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onLoadedMetadata={handleLoadMetadata}
        onTimeUpdate={handleUpdateTime}
      />

      <div className='o-playerControls__header'>
        <div className='o-playerControls__title' data-loading='inherit'>
          <h2>Now Playing</h2>
        </div>
        <div
          className='o-playerControls__action'
          role='button'
          onClick={e => handleToggleMode(e, 'mini')}
        >
          <MoreIcon />
        </div>
      </div>

      <div className='o-playerControls__image'>
        <div
          className={mapClassNameModifiers(
            'o-playerControls__inner',
            isPlayed && 'playing'
          )}
          data-loading='inherit'
        >
          <img src={thumbnail.url} alt={title} />
        </div>
      </div>

      <div className='o-playerControls__info'>
        <div className='o-playerControls__name' data-loading='inherit'>
          <h3>{title}</h3>
        </div>
        <div className='o-playerControls__author' data-loading='inherit'>
          <p>{channel}</p>
        </div>
      </div>

      <div className='o-playerControls__time' data-loading='inherit'>
        <div className='o-playerControls__progress-bar' data-loading='inherit'>
          <ProgressBar
            isInteractive={viewMode === 'full'}
            max={duration}
            value={currentTime}
            onChangeValue={handleChangeCurrentTime}
          />
        </div>
        <div className='o-playerControls__value' data-loading='inherit'>
          <span>{HHMMSS(currentTime)}</span>
        </div>
        <div className='o-playerControls__value' data-loading='inherit'>
          <span>{HHMMSS(duration)}</span>
        </div>
      </div>

      <div
        className='o-playerControls__actions'
        onClick={e => e.stopPropagation()}
      >
        {['shuffle', 'previous', 'pause', 'next', 'repeat'].map(btn => {
          if (btn === 'pause' && !isPlayed) {
            btn = 'play';
          }
          return renderTypeButton(btn as TRenderButton);
        })}
      </div>
    </div>
  );
};

export default PlayerControls;
