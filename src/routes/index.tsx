
import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

// Create a browser router with a catch-all route that delegates
// to the AppRoutes component for further routing
export const browserRouter = createBrowserRouter([
  {
    path: "*",
    element: <AppRoutes />
  }
]);

export default browserRouter;
