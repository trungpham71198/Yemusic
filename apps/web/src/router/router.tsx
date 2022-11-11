import { MainLayout } from '@feature/MainLayout';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ROUTE } from './constant';
import type { AppRoute } from './type';

const routes: AppRoute[] = [
  {
    name: 'Home',
    path: ROUTE.Home,
    element: lazy(() => import('../pages/Home')),
  },
  {
    name: 'Liked Track',
    path: ROUTE.LikeTrack,
    element: lazy(() => import('../pages/LikeTrack')),
  },
];

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <MainLayout>
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
      </MainLayout>
    </Router>
  );
};
