import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {ErrorBoundary} from 'react-error-boundary';

import App from './App.tsx';
import './index.css';
import { store } from './redux/store';
import { ErrorFallback } from './ErrorFallback';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </Provider>
  // </React.StrictMode>
);
