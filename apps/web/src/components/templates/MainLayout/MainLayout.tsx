import './style.scss';

import type { FC } from 'react';
import type React from 'react';

export interface MainLayoutProps {
  device: 'mobile' | 'desktop';
  render: {
    common?: {
      playerControls?: React.ReactElement;
      children: React.ReactNode;
    };
    desktop: {
      header: React.ReactElement;
      navigation?: React.ReactElement;
      recentList?: React.ReactElement;
    };
    mobile: {
      header: React.ReactElement;
      navigation?: React.ReactElement;
    };
  };
}

export const MainLayout: FC<MainLayoutProps> = ({ device, render }) => {
  const {
    common: commonRender,
    mobile: mobileRender,
    desktop: desktopRender,
  } = render;

  if (device === 'mobile') {
    return (
      <div className='t-main-layout -mobile'>
        <div className='t-main-layout_header'>{mobileRender.header}</div>
        <div className='t-main-layout_main'>
          <div className='t-main-layout_main_content'>
            {commonRender?.children}
          </div>
        </div>
        <div className='t-main-layout_player-controls'>
          {commonRender?.playerControls}
        </div>
        <div className='t-main-layout_navigation'>
          {mobileRender.navigation}
        </div>
      </div>
    );
  } else {
    return (
      <div className='t-main-layout -desktop flex flex-col'>
        {desktopRender.header}
        <div className='t-main-layout_body h-full'>
          <div className='t-main-layout_navigation'>
            {desktopRender.navigation}
          </div>
          <div className='t-main-layout_main'>{commonRender?.children}</div>
          <div className='t-main-layout_sidebar -right'>
            {desktopRender.recentList}
            {commonRender?.playerControls}
          </div>
        </div>
      </div>
    );
  }
};

export default MainLayout;
