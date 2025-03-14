
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
import acquisitionRoutes from './acquisitionRoutes';
import settingsRoutes from './settingsRoutes';

// Export the Router component for direct use in JSX contexts
export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

// Combine all routes for the browser router
const combinedRoutes = [
  {
    path: "/",
    element: <AppRoutes />
  }
];

// Create a router instance for RouterProvider
export const browserRouter = createBrowserRouter(combinedRoutes);
