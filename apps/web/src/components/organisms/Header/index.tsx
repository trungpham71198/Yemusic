import './styles.scss';

import logoSrc from '@assets/images/logo.png';
import Button from '@components/atoms/Button';
import Search from '@feature/Search';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

// const theme = 'light';

const Header: FC = () => {
  return (
    <header className='o-header'>
      <Link to='/' className='flex items-center w-max'>
        <img src={logoSrc} alt='Yemusic' className='logo' />
        <h1>Yemusic</h1>
      </Link>

      <div className='wrap-search'>
        <Search />
      </div>

      <Button className='o-header_btn' />
    </header>
  );
};

export default Header;
