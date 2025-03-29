
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';

// Lazy-loaded page components
const ComponentsShowcase = lazy(() => import('./pages/ComponentsShowcase'));
const TypographyPage = lazy(() => import('./pages/TypographyPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/components" element={<ComponentsShowcase />} />
          <Route path="/typography" element={<TypographyPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
