import './style.scss';

import classNames from 'classnames';
import type { FC } from 'react';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface ProgressBarProps {
  isInteractive?: boolean;
  max: number;
  value: number;
  onChangeValue?: (newValue: number) => void;
}

const setProgressBarTransform = (
  progressBarRefElement: HTMLDivElement,
  value: number,
  max: number
): void => {
  if (progressBarRefElement && value >= 0 && value <= max) {
    progressBarRefElement.style.setProperty(
      '--progress-bar-transform',
      (value / max) * 100 + '%'
    );
  }
};

export const ProgressBar: FC<ProgressBarProps> = ({
  isInteractive,
  max,
  value,
  onChangeValue,
}) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPressed, setIsPressed] = useState(false);

  if (progressBarRef.current && !isPressed) {
    setProgressBarTransform(progressBarRef.current, value, max);
  }

  const handlePressDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (isInteractive) {
        setIsPressed(true);

        if (progressBarRef.current) {
          const { offsetWidth } = progressBarRef.current;
          const {
            nativeEvent: { offsetX },
          } = e;

          progressBarRef.current.classList.toggle('-is-draging');
          setProgressBarTransform(progressBarRef.current, offsetX, offsetWidth);
        }
      }
    },
    [isInteractive]
  );

  const handlePressUp = useCallback(
    (e: MouseEvent) => {
      setIsPressed(false);

      if (progressBarRef.current) {
        const { offsetWidth } = progressBarRef.current;
        const { offsetX } = e;

        progressBarRef.current.classList.toggle('-is-draging');
        setProgressBarTransform(progressBarRef.current, offsetX, offsetWidth);

        if (onChangeValue) {
          let newvalue = (offsetX / offsetWidth) * max;

          if (newvalue < 0) {
            newvalue = 0;
          }
          if (newvalue > max) {
            newvalue = max;
          }

          onChangeValue(newvalue);
        }
      }
    },
    [max, onChangeValue]
  );

  const handleDragMove = useCallback(
    (e: MouseEvent) => {
      if (progressBarRef.current) {
        const { offsetWidth } = progressBarRef.current;
        const { offsetX } = e;

        setProgressBarTransform(progressBarRef.current, offsetX, offsetWidth);

        if (onChangeValue) {
          let newvalue = (offsetX / offsetWidth) * max;

          if (newvalue < 0) {
            newvalue = 0;
          }
          if (newvalue > max) {
            newvalue = max;
          }

          onChangeValue(newvalue);
        }
      }
    },
    [max, onChangeValue]
  );

  useEffect(() => {
    if (isPressed) {
      window.addEventListener('mouseup', handlePressUp);
      window.addEventListener('mousemove', handleDragMove);
    }

    return () => {
      if (isPressed) {
        window.removeEventListener('mouseup', handlePressUp);
        window.removeEventListener('mousemove', handleDragMove);
      }
    };
  }, [handleDragMove, handlePressUp, isPressed]);

  return (
    <div
      className={classNames(
        'm-progress-bar',
        isInteractive && '-is-interactive'
      )}
      onMouseDown={handlePressDown}
      ref={progressBarRef}
    >
      <div className='m-progress-bar_value' />
    </div>
  );
};

export default ProgressBar;
