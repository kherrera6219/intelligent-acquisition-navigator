
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

// Export the Router component for direct use
export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

// Create a router instance for RouterProvider
const browserRouter = createBrowserRouter([
  {
    path: "*",
    element: <AppRoutes />
  }
]);

export { browserRouter as Router };
