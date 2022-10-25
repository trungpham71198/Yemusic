import './index.scss';

import { store } from '@store/store';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { AppRouter } from './router';

const rootElm = document.getElementById('root');

if (rootElm) {
  ReactDOM.createRoot(rootElm).render(
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}
