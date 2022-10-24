import { useEffect, useRef, FC, useState } from 'react';
import { ISong } from '@core/domain/models/song';
import { useDebounce } from '@hooks/useDebounce';
import abemClasses from '@utils/abemClasses';

import Input, { InputProps } from '@common/components/atoms/Input';
import { ArrowLeftIcon, SearchIcon } from '@common/components/atoms/Icon';

import './style.scss';

export interface ISearch extends InputProps {
  onSearch: (value: string) => void;
  dataSource: ISong[];
  handleClickChoose: (item: ISong) => void;
}

const Search: FC<ISearch> = ({
  onSearch,
  dataSource,
  handleClickChoose,
  ...otherProps
}) => {
  const [isActive, setIsActive] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const keywordDebounce = useDebounce(keyword, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setIsLoading(true);
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  useEffect(() => {
    const listener = (event: any) => {
      if (!searchRef.current || searchRef.current.contains(event.target)) {
        return;
      }
      setIsActive(false);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, []);

  useEffect(() => {
    if (keywordDebounce) {
      onSearch(keywordDebounce.trim());
    }
  }, [keywordDebounce]);

  return (
    <div className='o-search'>
      <div className='o-search_inner' ref={searchRef}>
        <Input
          prefix={
            <div
              className='o-search_input_icon'
              role='button'
              onClick={handleBlur}
            >
              {isActive ? <ArrowLeftIcon /> : <SearchIcon />}
            </div>
          }
          fullWidth
          shape='round'
          onChange={handleChange}
          onFocus={handleFocus}
          {...otherProps}
        />
        <div
          className={abemClasses('o-search_body', isActive && 'open')}
          style={{
            height:
              dataSource.length && isActive
                ? '250px'
                : isActive
                ? '82px'
                : '0px',
          }}
        >
          <div className='o-search_title'>
            {keyword === '' ? (
              <p>Recent search</p>
            ) : (
              <p>
                Search for <strong>"{keyword}"</strong>
              </p>
            )}
          </div>
          <div className='o-search_list' data-loading={isLoading}>
            {dataSource?.map(item => (
              <div
                className={abemClasses('o-search_item')}
                role='button'
                onClick={() => handleClickChoose(item)}
                key={item.yId}
              >
                <div className='o-search_item_thumbnail' data-loading='inherit'>
                  <img src={item.thumbnail.url} alt={item.title} />
                </div>
                <div className='o-search_item_info'>
                  <div
                    className='o-search_item_info_name'
                    data-loading='inherit'
                  >
                    <h3>{item.title}</h3>
                  </div>
                  <div
                    className='o-search_item_info_author'
                    data-loading='inherit'
                  >
                    <p>{item.channel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
