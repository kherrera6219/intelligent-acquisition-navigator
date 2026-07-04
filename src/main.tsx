
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/application.css';

// Validate required environment variables at startup (dev only to avoid leaking var names in prod)
if (import.meta.env.DEV) {
  const provider = (import.meta.env.VITE_AI_PROVIDER as string | undefined)?.toLowerCase();
  const required =
    provider === 'gemini'
      ? (['VITE_GEMINI_API_KEY'] as const)
      : (['VITE_OPENAI_API_KEY'] as const);
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
