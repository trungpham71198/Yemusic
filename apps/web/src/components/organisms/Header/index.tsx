import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import type { FC } from 'react';
import { useContext } from 'react';
//import { actionSetTheme, DisplayContext } from '@domains/display';
import { Link } from 'react-router-dom';

const theme = 'light';

export const MobileHeader: FC = () => {
  // const { theme } = useContext(DisplayContext);
  const handleToggleTheme = () => {
    // actionSetTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className='c-app-default_header -mobile'>
      <Link to='/' className='c-app-default_header_logo'>
        <Icon iconName='logo' />
        <h1>Yemusic</h1>
      </Link>

      <div className='c-app-default_header_action'>
        <Button
          prefix={<Icon iconName='clock' />}
          shape='circle'
          onClick={handleToggleTheme}
        />
      </div>
    </div>
  );
};

export const DesktopHeader: FC = () => {
  return (
    <div className='c-app-default_header -desktop'>
      <Link to='/' className='c-app-default_header_logo'>
        <Icon iconName='logo' />
        <h1>Yemusic</h1>
      </Link>
    </div>
  );
};

export const DesktopHeaderSettings: FC = () => {
  const handleToggleTheme = () => {
    //  actionSetTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className='c-app-default_header_settings'>
      <div className='c-app-default_header_action'>
        <Button
          prefix={<Icon iconName='clock' />}
          shape='circle'
          onClick={handleToggleTheme}
        />
      </div>
    </div>
  );
};
