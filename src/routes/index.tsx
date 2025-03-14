
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import NotFoundPage from '@/pages/NotFoundPage';

/**
 * Router component for direct use in JSX contexts
 */
export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

/**
 * Browser router instance for RouterProvider (used in main.tsx)
 */
export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppRoutes />,
    errorElement: <NotFoundPage />
  }
]);
