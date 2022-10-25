import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ROUTE } from './constant';
import type { AppRoute } from './type';

const routes: AppRoute[] = [
  {
    name: 'Home page',
    path: ROUTE.Home,
    element: lazy(() => import('../pages/Home')),
  },
];

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          {routes.map(({ path, element: Element }) => (
            <Route
              key={path}
              path={path}
              element={React.isValidElement(Element) ? Element : <Element />}
            />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};
