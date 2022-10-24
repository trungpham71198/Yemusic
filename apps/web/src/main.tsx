import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import { AppRouter } from './router';

const rootElm = document.getElementById('root');

if (rootElm) {
  ReactDOM.createRoot(rootElm).render(<AppRouter />);
}
