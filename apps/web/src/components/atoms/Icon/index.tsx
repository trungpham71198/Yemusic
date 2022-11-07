import classNames from 'classnames';
import type { FC, SVGProps } from 'react';

import { useDynamicSvgImport } from './useDynamicSvgImport';

export type IconName =
  | 'arrow-left-circle'
  | 'arrow-left'
  | 'clock'
  | 'close'
  | 'download'
  | 'facebook'
  | 'google'
  | 'heart'
  | 'home'
  | 'logo'
  | 'more'
  | 'mute'
  | 'next'
  | 'pause'
  | 'play'
  | 'play'
  | 'previous'
  | 'repeat-one'
  | 'repeat'
  | 'search'
  | 'setting'
  | 'shuffle'
  | 'user'
  | 'volume-hight'
  | 'volume-low';

interface IProps {
  iconName: IconName;
  wrapperStyle?: string;
  svgProps?: SVGProps<SVGSVGElement>;
}

const Icon: FC<IProps> = (props: IProps) => {
  const { iconName, wrapperStyle, svgProps } = props;
  const { loading, SvgIcon } = useDynamicSvgImport(iconName);

  return (
    <>
      {loading && (
        <div className='rounded-full bg-slate-400 animate-pulse h-8 w-8'></div>
      )}
      {SvgIcon && (
        <SvgIcon
          className={classNames('w-6 h-6', wrapperStyle)}
          {...svgProps}
        />
      )}
    </>
  );
};

export default Icon;
