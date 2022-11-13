import Icon from '@components/atoms/Icon';
import Search from '@feature/Search';
import { useViewport } from '@hooks/useViewport';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// const theme = 'light';

const Header: FC = () => {
  const { viewport } = useViewport();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpenMobileSearch, setOpenMobileSearch] = useState(false);

  useEffect(
    function focusSearchInputOnOpenMobileSearch() {
      if (isOpenMobileSearch) {
        inputRef.current?.focus();
      }
    },
    [isOpenMobileSearch]
  );

  useEffect(
    function closeMobileSearchOnDesktop() {
      if (viewport === 'desktop') {
        setOpenMobileSearch(false);
      }
    },
    [viewport]
  );

  return (
    <header className='o-header'>
      <Link to='/' className='flex items-center w-max'>
        <Icon iconName='logo' wrapperStyle='logo mr-4' />
        <h1>Yemusic</h1>
      </Link>

      <div className='o-header-search'>
        <Search
          ref={inputRef}
          onCloseMobileSearch={() => setOpenMobileSearch(false)}
        />
      </div>

      <button className='o-header_btn' />
    </header>
  );
};

export default Header;
