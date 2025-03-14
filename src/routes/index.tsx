
import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import routes from '@/routes';

export const browserRouter = createBrowserRouter([
  {
    path: "*",
    element: <AppRoutes />
  }
]);

export default browserRouter;
