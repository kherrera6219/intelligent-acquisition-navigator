
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/application.css';

// Validate required environment variables at startup (dev only to avoid leaking var names in prod)
if (import.meta.env.DEV) {
  const required = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_AZURE_ENDPOINT',
    'VITE_AZURE_OPENAI_API_KEY',
  ] as const;
  const missing = required.filter((key) => !import.meta.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `[ENV] Missing required environment variables: ${missing.join(', ')}.\n` +
      'Copy .env.example to .env.local and fill in the values.'
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
