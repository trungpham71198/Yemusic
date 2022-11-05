import './styles.scss';

import logoSrc from '@assets/images/logo.png';
import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import Modal from '@components/molecules/Modal';
import Search from '@feature/Search';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// const theme = 'light';
const MAX_W_SM = 640;

const Header: FC = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  const handleClickIconButtonSearch = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const handler = () => {
      if (document.body.offsetWidth > MAX_W_SM) {
        setOpenModal(false);
      }
      setScreenWidth(document.body.offsetWidth);
    };

    handler();
    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  useEffect(() => {
    if (isOpenModal) {
      const listEl = document.getElementsByClassName('a-input-group_input');

      if (listEl?.length > 0) {
        const searchInputEl = listEl[0] as HTMLInputElement;
        searchInputEl.focus();
      }
    }
  }, [isOpenModal]);

  return (
    <header className='o-header'>
      <Link to='/' className='flex items-center w-max'>
        <img src={logoSrc} alt='Yemusic' className='logo' />
        <h1>Yemusic</h1>
      </Link>

      <div className='wrap-search'>
        {screenWidth > MAX_W_SM ? (
          <div className='absolute -top-7'>
            <Search />
          </div>
        ) : (
          <div className='flex justify-end'>
            <Button shape='circle' onClick={handleClickIconButtonSearch}>
              <Icon iconName='search' />
            </Button>
          </div>
        )}
      </div>

      <Modal
        open={isOpenModal && screenWidth <= MAX_W_SM}
        onClose={() => setOpenModal(false)}
      >
        <div className='w-screen'>
          <Search />
        </div>
      </Modal>

      <button className='o-header_btn' />
    </header>
  );
};

export default Header;
