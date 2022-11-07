import { useCallback, useEffect, useRef, useState } from 'react';

enum Viewport {
  PHONE = 'mobile',
  DESKTOP = 'desktop',
}

type TViewPort = { viewport: Viewport };

const getDeviceConfig = (width: number): Viewport => {
  if (width <= 1024) {
    return Viewport.PHONE;
  } else {
    return Viewport.DESKTOP;
  }
};

export const useViewport = (): TViewPort => {
  const [viewport, setViewport] = useState<Viewport>(Viewport.DESKTOP);
  const viewRef = useRef(Viewport.DESKTOP);

  const setCurrentViewport = useCallback((currentViewport: Viewport) => {
    if (viewRef.current !== currentViewport) {
      setViewport(currentViewport);
      viewRef.current = currentViewport;
    }
  }, []);

  useEffect(() => {
    const initialViewport = getDeviceConfig(window.innerWidth);
    setCurrentViewport(initialViewport);

    const calcInnerWidth = () => {
      const newViewport = getDeviceConfig(window.innerWidth);
      setCurrentViewport(newViewport);
    };

    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, [setCurrentViewport]);

  return { viewport };
};
