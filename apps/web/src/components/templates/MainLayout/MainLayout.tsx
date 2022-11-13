import { Navigation } from '@components/organisms/Navigation';
import type React from 'react';
import type { FC } from 'react';

export interface MainLayoutProps {
  device: 'mobile' | 'desktop';
  playerControls?: React.ReactElement;
  children: React.ReactNode;
  header: React.ReactElement;
  recentList?: React.ReactElement;
}

export const MainLayout: FC<MainLayoutProps> = ({
  device,
  header,
  children,
  // recentList,
  playerControls,
}) => {
  return (
    <div className={`t-main-layout`}>
      <div className='t-main-layout_header'>{header}</div>
      <div className='wrap-main'>
        <div className='wrap-main_main'>
          <div className='wrap-main_main_content'>{children}</div>
        </div>
        <div className='wrap-main_player-controls'>{playerControls}</div>
      </div>
      <div className='t-main-layout_navigation'>
        {
          <Navigation
            mode={device === 'mobile' ? 'horizontal' : 'vertical'}
            device={device}
          />
        }
      </div>
    </div>
  );
};

export default MainLayout;
