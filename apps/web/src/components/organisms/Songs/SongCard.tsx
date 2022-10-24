import React, { FC } from 'react';

import {
  DownloadIcon,
  HeartActiveIcon,
  HeartIcon,
} from '@common/components/atoms/Icon';
import abemClasses from '@utils/abemClasses';

import './style.scss';

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

  // const skeletonCard = () => {
  //   return (
  //     <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
  //       <div class="flex justify-center items-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
  //         <svg
  //           class="w-12 h-12 text-gray-200"
  //           xmlns="http://www.w3.org/2000/svg"
  //           aria-hidden="true"
  //           fill="currentColor"
  //           viewBox="0 0 640 512"
  //         >
  //           <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
  //         </svg>
  //       </div>
  //       <div class="w-full">
  //         <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
  //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
  //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
  //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
  //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
  //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
  //       </div>
  //       <span class="sr-only">Loading...</span>
  //     </div>
  //   );
  // };

  return (
    <div
      className={abemClasses(
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
