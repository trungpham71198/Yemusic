import type { INavigation } from '@components/molecules/Nav';
import Nav from '@components/molecules/Nav';
import classNames from 'classnames';
import type { FC } from 'react';

export interface TProps {
  device?: 'mobile' | 'desktop';
  mode?: 'horizontal' | 'vertical';
}

export const Navigation: FC<TProps> = props => {
  const { device = 'desktop', mode = 'vertical' } = props;

  const navigation: INavigation[] = [
    {
      icon: 'home',
      name: 'Home',
      to: '/',
    },
    {
      icon: 'search',
      name: 'Search',
      to: '/search',
      device: 'mobile',
    },
    {
      icon: 'heart',
      name: 'Liked Tracks',
      to: '/liked-tracks',
    },
  ];

  return (
    <div className={classNames('o-navigation', device)}>
      <Nav mode={mode} device={device} navigation={navigation} />
    </div>
  );
};
