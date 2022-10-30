import './style.scss';

import Icon from '@components/atoms/Icon';
import type { InputProps } from '@components/atoms/Input';
import Input from '@components/atoms/Input';
import type { ISong } from '@core/domain/models/song';
import debounce from '@utils/debouce';
import { safelyParseJSON } from '@utils/json';
import classNames from 'classnames';
import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

export interface IOSearch extends InputProps {
  loading?: boolean;
  listSongs?: ISong[];
  onSearch: (value: string) => void;
  onClickSong: (item: ISong) => void;
}

const OSearch: FC<IOSearch> = ({
  loading,
  listSongs,
  onSearch,
  onClickSong,
}) => {
  const searchRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState({
    keyword: '',
    isFocus: false,
    isTyping: false,
  });

  const onSearchDebounce = useMemo(
    () => debounce((value: string) => onSearch(value)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleToggleFocus = (isFocus: boolean) => {
    setState(prev => ({
      ...prev,
      isFocus,
    }));
  };

  const handleToggleTypingMemo = useMemo(
    () =>
      debounce((isTyping: boolean) =>
        setState(prev => ({
          ...prev,
          isTyping,
        }))
      ),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setState(prev => ({
      ...prev,
      keyword: value,
      isTyping: true,
    }));

    handleToggleTypingMemo(false);

    if (value.trim()) {
      onSearchDebounce(value.trim());
    }
  };

  const handleClickSong = (song: ISong) => {
    onClickSong(song);
    handleToggleFocus(false);
  };

  const isLoading = loading || state.isTyping;

  const listSongsMemo = useMemo(() => {
    let listSongsRendered = listSongs;

    if (state.keyword.trim()) {
      if (isLoading) {
        listSongsRendered = new Array(3).fill({});
      }
    } else {
      listSongsRendered = safelyParseJSON(
        localStorage.getItem('recent') || '[]',
        []
      );
    }
    return listSongsRendered;
  }, [listSongs, isLoading, state.keyword]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node) &&
        state.isFocus
      ) {
        handleToggleFocus(false);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [state.isFocus]);

  return (
    <div
      ref={searchRef}
      className={classNames('o-search', state.isFocus && '-focus')}
    >
      <Input
        fullWidth
        shape='round'
        prefix={
          <div className='o-search_input_icon' role='button'>
            <span
              className={classNames(!state.isFocus && 'hidden')}
              onClick={() => handleToggleFocus(false)}
            >
              <Icon iconName='arrow-left' />
            </span>
            <span className={classNames(state.isFocus && 'hidden')}>
              <Icon iconName='search' />
            </span>
          </div>
        }
        onFocus={() => handleToggleFocus(true)}
        value={state.keyword}
        onChange={handleInputChange}
      />
      <div className={classNames('o-search_body')}>
        {state.isFocus && (
          <div className='o-search_title'>
            {state.keyword.trim() === '' ? (
              <p>Recent songs</p>
            ) : (
              <p>
                Search for <strong>"{state.keyword}"</strong>
              </p>
            )}
          </div>
        )}
        <div className='o-search_list'>
          {state.isFocus &&
            listSongsMemo?.map((item, index) => (
              <div
                key={item?.yId || index}
                className='o-search_item'
                role='button'
                data-loading={isLoading}
                onClick={() => handleClickSong(item)}
              >
                <div className='o-search_item_thumbnail' data-loading='inherit'>
                  <img src={item?.thumbnail?.url} alt={item?.title} />
                </div>
                <div className='o-search_item_info'>
                  <div
                    className={classNames(
                      'o-search_item_info_name',
                      isLoading && 'h-4'
                    )}
                    data-loading='inherit'
                  >
                    <h4>{item?.title}</h4>
                  </div>
                  <div
                    className={classNames(
                      'o-search_item_info_author',
                      isLoading && 'h-4'
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
