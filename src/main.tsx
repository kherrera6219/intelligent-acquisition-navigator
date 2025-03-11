
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// CSS imports in correct order
import './styles/theme/index.css';
import './styles/global.css';
import './styles/application.css';
import './index.css';

import { registerServiceWorker } from './serviceWorkerRegistration';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Register service worker for PWA support
registerServiceWorker();
