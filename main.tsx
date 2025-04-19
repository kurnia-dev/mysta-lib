import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './playground/App';
import { MystaLibProvider } from 'lib/context';

// Global styles
import './library/assets/css/main.css';

// Preset
import { kitsune } from './presets';
import './presets/kitsune/index.css';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <MystaLibProvider configOptions={{ preset: kitsune }}>
        <App />
      </MystaLibProvider>
    </React.StrictMode>,
  );
}
