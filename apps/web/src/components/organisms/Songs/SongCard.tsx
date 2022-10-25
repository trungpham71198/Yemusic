import './style.scss';

import {
  DownloadIcon,
  HeartActiveIcon,
  HeartIcon,
} from '@components/atoms/Icon';
import { mapClassNameModifiers } from '@helpers/style';
import type { FC } from 'react';
import type React from 'react';

export interface IProps {
  author: string;
  direction?: 'horizontal' | 'vertical';
  duration: string;
  title: string;
  imageSrc: string;
  isLiked: boolean;
  isLoading?: boolean;
  isPlaying: boolean;
  onClick: () => void;
  onClickLike: () => void;
  onClickDownload: () => void;
}

export const SongCard: FC<IProps> = ({
  author,
  direction,
  duration,
  title,
  imageSrc,
  isLiked,
  isLoading,
  isPlaying,
  onClick,
  onClickLike,
  onClickDownload,
}) => {
  const handleClickLike = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onClickLike();
  };

  const handleClickDownload = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onClickDownload();
  };

  return (
    <div
      className={mapClassNameModifiers(
        'o-song-card',
        direction,
        isPlaying && 'is-playing'
      )}
      data-loading={isLoading}
    >
      <div className='o-song-card_image' data-loading='inherit' role='button'>
        <img src={imageSrc} alt={title} />
      </div>
      <div className='o-song-card_info'>
        <div
          className='o-song-card_info_title'
          data-loading='inherit'
          onClick={onClick}
        >
          <h4 title={title}>{title}</h4>
        </div>
        <div className='o-song-card_info_author' data-loading='inherit'>
          <span />
          {isPlaying ? <p>Now playing</p> : <p title={author}>{author}</p>}
        </div>
      </div>
      <div className='o-song-card_time' data-loading='inherit'>
        <time>{duration}</time>
      </div>
      <div className='o-song-card_actionlist'>
        <span
          className='o-song-card_actionlist_item'
          data-loading='inherit'
          role='button'
          onClick={handleClickLike}
        >
          {isLiked ? <HeartActiveIcon color='primary' /> : <HeartIcon />}
        </span>
        <span
          className='o-song-card_actionlist_item'
          data-loading='inherit'
          role='button'
          onClick={handleClickDownload}
        >
          <DownloadIcon />
        </span>
      </div>
    </div>
  );
};

export default SongCard;
