import './style.scss';

import Icon from '@components/atoms/Icon';
import type { InputProps } from '@components/atoms/Input';
import Input from '@components/atoms/Input';
import type { ISong } from '@core/domain/models/song';
import useClickOutside from '@hooks/useClickOutside';
import { useViewport } from '@hooks/useViewport';
import debounce from '@utils/debouce';
import { safelyParseJSON } from '@utils/json';
import classNames from 'classnames';
import type { FC, MouseEvent } from 'react';
import { useMemo, useRef, useState } from 'react';

export interface IOSearch extends InputProps {
  loading?: boolean;
  listSongs?: ISong[];
  onSearch: (value: string) => void;
  onClickSong: (item: ISong) => void;
  onClickBackIcon?: (e: MouseEvent<HTMLSpanElement>) => void;
}

const OSearch: FC<IOSearch> = ({
  loading,
  listSongs,
  onSearch,
  onClickSong,
  onClickBackIcon,
  ...inputProps
}) => {
  const { viewport } = useViewport();

  const searchRef = useRef<HTMLDivElement>(null);

  const [keyword, setKeyword] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const handleClickBackIcon = (e: MouseEvent<HTMLSpanElement>) => {
    setIsFocus(false);
    onClickBackIcon && onClickBackIcon(e);
  };

  const onSearchDebounce = useMemo(
    () => debounce((value: string) => onSearch(value)),
    [onSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setKeyword(value);
    onSearchDebounce(value.trim());
  };

  const handleClickSong = (song: ISong) => {
    onClickSong(song);
    setIsFocus(false);
  };

  const listSongsMemo = useMemo(() => {
    if (loading) {
      return new Array(3).fill({});
    }
    return listSongs;
  }, [listSongs, loading]);

  const renderedListSongs = keyword.trim()
    ? listSongsMemo
    : safelyParseJSON(localStorage.getItem('recent') || '[]', []);

  useClickOutside(searchRef, () => setIsFocus(false));

  return (
    <div
      ref={searchRef}
      className={classNames(
        'o-search',
        isFocus && '-focus',
        viewport === 'mobile' && 'max-w-none'
      )}
    >
      <Input
        fullWidth
        shape='round'
        prefix={
          <div className='o-search_input_icon' role='button'>
            <span
              className={classNames(!isFocus && 'hidden')}
              onClick={handleClickBackIcon}
            >
              <Icon iconName='arrow-left' />
            </span>
            <span className={classNames(isFocus && 'hidden')}>
              <Icon iconName='search' />
            </span>
          </div>
        }
        onFocus={() => setIsFocus(true)}
        value={keyword}
        onChange={handleInputChange}
        {...inputProps}
      />
      <div className={classNames('o-search_body')}>
        {isFocus && (
          <div className='o-search_title'>
            {keyword.trim() === '' ? (
              <p>Recent songs</p>
            ) : (
              <p>
                Search for <strong>"{keyword.trim()}"</strong>
              </p>
            )}
          </div>
        )}
        <div
          className={classNames(
            'o-search_list',
            viewport === 'mobile' && 'h-[calc(100vh-90px)] max-h-[none]'
          )}
        >
          {isFocus &&
            renderedListSongs?.map((item, index) => (
              <div
                key={item?.yId || index}
                className='o-search_item'
                role='button'
                data-loading={loading}
                onClick={() => handleClickSong(item)}
              >
                <div className='o-search_item_thumbnail' data-loading='inherit'>
                  <img src={item?.thumbnail?.url} alt={item?.title} />
                </div>
                <div className='o-search_item_info'>
                  <div
                    className={classNames(
                      'o-search_item_info_name',
                      loading && 'h-4'
                    )}
                    data-loading='inherit'
                  >
                    <h4>{item?.title}</h4>
                  </div>
                  <div
                    className={classNames(
                      'o-search_item_info_author',
                      loading && 'h-4'
                    )}
                    data-loading='inherit'
                  >
                    <p>{item?.channel}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OSearch;
