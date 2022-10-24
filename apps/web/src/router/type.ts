import React from 'react';

export type AppRoute = {
  name: string;
  path: string;
  element: React.FC | React.LazyExoticComponent<React.FC>;
};
