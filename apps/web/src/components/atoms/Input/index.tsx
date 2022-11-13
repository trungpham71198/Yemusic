import classNames from 'classnames';
import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from 'react';
import { forwardRef } from 'react';

export interface InputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'prefix'
  > {
  fullWidth?: boolean;
  prefix?: ReactNode;
  shape?: 'round';
  suffix?: ReactNode;
}

export const Input = forwardRef(
  (props: InputProps, ref?: Ref<HTMLInputElement>) => {
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
