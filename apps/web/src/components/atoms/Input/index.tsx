import './style.scss';

import classNames from 'classnames';
import React from 'react';

export interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'prefix'
  > {
  fullWidth?: boolean;
  prefix?: React.ReactNode;
  shape?: 'round';
  suffix?: React.ReactNode;
}

export const Input = React.forwardRef(
  (props: InputProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
    const {
      className,
      disabled,
      fullWidth,
      prefix,
      shape,
      suffix,
      ...otherProps
    } = props;
    return (
      <div
        className={classNames(
          'a-input-group',
          disabled && '-disabled',
          fullWidth && '-full-width',
          shape && `-${shape}`,
          className
        )}
      >
        {prefix && <div className='a-input-group_addon -prefix'>{prefix}</div>}
        <input
          ref={ref}
          className='a-input-group_input'
          disabled={disabled}
          {...otherProps}
        />
        {suffix && <div className='a-input-group_addon -suffix'>{suffix}</div>}
      </div>
    );
  }
);

export default Input;
