import './style.scss';

import classNames from 'classnames';
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactNode,
} from 'react';

export interface ButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'prefix'
  > {
  prefix?: ReactNode;
  suffix?: ReactNode;
  fullWidth?: boolean;
  shape?: 'default' | 'circle';
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  disabled,
  fullWidth,
  prefix,
  shape = 'default',
  suffix,
  ...otherProps
}) => {
  return (
    <button
      className={classNames(
        'a-button',
        shape,
        fullWidth && '-full-width',
        disabled && '-disabled'
      )}
      {...otherProps}
    >
      {prefix && <span className='a-button_addon'>{prefix}</span>}
      {children && <span className='a-button_text'>{children}</span>}
      {suffix && <span className='a-button_addon'>{suffix}</span>}
    </button>
  );
};

export default Button;
