import Header from '@components/organisms/Header';
import { MainLayout as MainLayoutCommon } from '@components/templates/MainLayout';
import { PlayerControls } from '@feature/PlayerControls';
import { useViewport } from '@hooks/useViewport';
import type { FC, ReactNode } from 'react';

type TProps = {
  children: ReactNode;
};

export const MainLayout: FC<TProps> = ({ children }) => {
  // const { theme } = useContext(DisplayContext);
  // const theme = 'light';
  const { viewport: device } = useViewport();

  // useEffect(() => {}, [theme]);

  return (
    <MainLayoutCommon
      device={device}
      playerControls={<PlayerControls device={device} />}
      header={<Header />}
    >
      {children}
    </MainLayoutCommon>
  );
};
