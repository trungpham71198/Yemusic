import Header from '@components/organisms/Header';
import { Navigation } from '@components/organisms/Navigation';
import { MainLayout as MainLayoutCommon } from '@components/templates/MainLayout';
import { PlayerControls } from '@feature/PlayerControls';
import { useViewport } from '@hooks/useViewport';
import type { FC, ReactNode } from 'react';

type TProps = {
  children: ReactNode;
};

export const MainLayout: FC<TProps> = ({ children }) => {
  // const { theme } = useContext(DisplayContext);
  const theme = 'light';
  const { viewport: device } = useViewport();

  // useEffect(() => {}, [theme]);

  return (
    <MainLayoutCommon
      device={device}
      render={{
        common: {
          playerControls: <PlayerControls device={device} />,
          children,
        },
        desktop: {
          header: <Header />,
          navigation: <Navigation />,
        },
        mobile: {
          header: <Header />,
          navigation: <Navigation mode='horizontal' device='mobile' />,
        },
      }}
    />
  );
};
