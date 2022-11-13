import type { IconName } from '@components/atoms/Icon';
import Icon from '@components/atoms/Icon';
import classNames from 'classnames';
import type { FC } from 'react';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface INavigation {
  icon: IconName;
  name: string;
  to: string;
  device?: string;
}

export interface NavProps {
  mode?: 'horizontal' | 'vertical';
  device: 'mobile' | 'desktop';
  navigation: INavigation[];
}

const handleUpdateNavItemActive = (
  navRef: React.RefObject<HTMLUListElement>,
  selected: number
) => {
  if (navRef.current) {
    const navItemActiveElement = navRef.current.children[
      selected
    ] as HTMLElement;

    if (navItemActiveElement) {
      const { offsetTop, offsetLeft, offsetWidth } = navItemActiveElement;

      navRef.current.style.setProperty(
        '--nav-item-active-top',
        offsetTop + 'px'
      );
      navRef.current.style.setProperty(
        '--nav-item-active-left',
        offsetLeft + 'px'
      );
      navRef.current.style.setProperty(
        '--nav-item-active-width',
        offsetWidth + 'px'
      );
    }
  }
};

export const Nav: FC<NavProps> = ({
  mode = 'horizontal',
  navigation,
  device,
}) => {
  const navRef = useRef<HTMLUListElement>(null);
  const selectedRef = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState(0);

  const navigations = useMemo(
    () => navigation.filter(nav => !nav.device || nav.device === device),
    [device, navigation]
  );

  const handleChangeItem = useCallback(
    (newSelected: number) => {
      setSelected(newSelected);
      selectedRef.current = newSelected;

      const link = navigations[newSelected].to;
      if (link) {
        navigate(link);
      }
    },
    [navigate, navigations]
  );

  useEffect(() => {
    selectedRef.current = selected;
    handleUpdateNavItemActive(navRef, selected);
  }, [mode, selected]);

  useEffect(() => {
    const pathname = location.pathname;

    navigations.forEach((nav, index) => {
      if (nav.to === pathname) {
        setSelected(index);
      }
    });
  }, [location.pathname, navigations]);

  useEffect(() => {
    window.addEventListener('resize', () =>
      handleUpdateNavItemActive(navRef, selectedRef.current)
    );

    return () => {
      window.removeEventListener('resize', () =>
        handleUpdateNavItemActive(navRef, selectedRef.current)
      );
    };
  }, []);

  return (
    <ul className={classNames('m-nav', '-' + mode)} ref={navRef}>
      {navigations.map((nav, index) => (
        <li
          key={nav.name}
          className={classNames(
            'm-nav_item',
            mode === 'horizontal' ? '-mini' : '-full',
            index === selected && '-active'
          )}
          role='button'
          onClick={() => handleChangeItem(index)}
        >
          <span className='m-nav_item_icon'>
            <Icon
              iconName={nav.icon}
              svgProps={{ stroke: index === selected ? '#26c0ae' : '#B0B0B0' }}
            />
          </span>
          <p className='m-nav_item_name'>{nav.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
