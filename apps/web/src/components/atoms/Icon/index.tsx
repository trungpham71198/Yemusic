import cls from 'classnames';
import type { FC } from 'react';

import { useDynamicSvgImport } from './useDynamicSvgImport';

type iconName =
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
  iconName: iconName;
  wrapperStyle?: string;
  svgProp?: React.SVGProps<SVGSVGElement>;
}

const Icon: FC<IProps> = (props: IProps) => {
  const { iconName, wrapperStyle, svgProp } = props;
  const { loading, SvgIcon } = useDynamicSvgImport(iconName);

  return (
    <>
      {loading && (
        <div className='rounded-full bg-slate-400 animate-pulse h-8 w-8'></div>
      )}
      {SvgIcon && (
        <SvgIcon className={cls('w-6 h-6', wrapperStyle)} {...svgProp} />
      )}
    </>
  );
};

export default Icon;
