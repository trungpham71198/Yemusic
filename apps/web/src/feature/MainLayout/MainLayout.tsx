import { FC, ReactNode, useEffect } from 'react';

import { MainLayout as MainLayoutCommon } from '@common/components/templates/MainLayout';
import {
  DesktopHeader,
  DesktopHeaderSettings,
  MobileHeader,
} from '@common/components/organisms/Header';
import Search from '@feature/Search';
import { Navigation } from '@common/components/organisms/Navigation';
import { useViewport } from '@hooks/useViewport';
import { PlayerControls } from '@feature/PlayerControls';

type TProps = {
  children: ReactNode;
};

export const MainLayout: FC<TProps> = ({ children }) => {
  // const { theme } = useContext(DisplayContext);
  const theme = 'light';
  const { viewport: device } = useViewport();

  useEffect(() => {}, [theme]);

  return (
    <MainLayoutCommon
      device={device}
      render={{
        common: {
          playerControls: <PlayerControls device={device} />,
          children,
        },
        desktop: {
          header: <DesktopHeader />,
          headerSettings: <DesktopHeaderSettings />,
          search: <Search />,
          navigation: <Navigation />,
        },
        mobile: {
          header: <MobileHeader />,
          navigation: <Navigation mode='horizontal' device='mobile' />,
        },
      }}
    />
  );
};
