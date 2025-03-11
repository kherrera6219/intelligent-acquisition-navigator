
import React from 'react';
import { Routes, Route, RouteObject } from 'react-router-dom';

interface AppRoutesProps {
  routes: RouteObject[];
}

const AppRoutes: React.FC<AppRoutesProps> = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route 
          key={route.path || index}
          path={route.path}
          element={route.element}
        >
          {route.children?.map((childRoute, childIndex) => (
            <Route
              key={childRoute.path || childIndex}
              path={childRoute.path}
              element={childRoute.element}
            />
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default AppRoutes;
