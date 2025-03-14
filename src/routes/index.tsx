
import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

export const browserRouter = createBrowserRouter([
  {
    path: "*",
    element: <AppRoutes />
  }
]);

export default browserRouter;
