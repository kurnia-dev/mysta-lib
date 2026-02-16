import React, { Suspense, useMemo } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import Layout from './layout/Layout';

// Auto-import all documentation components ending with Docs.tsx in docs folder
const docsModules = import.meta.glob('./docs/**/*Docs.tsx');

const App = () => {
  // Generate routes configuration from imported modules
  const routes = useMemo(() => {
    return Object.keys(docsModules)
      .map((path) => {
        // Example path: ./docs/button/ButtonDocs.tsx
        const parts = path.split('/');
        // parts[0] = '.', parts[1] = 'docs', parts[2] = 'button'
        const folderName = parts[2];

        // Convert folder-name to Title Case for display
        const name = folderName
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Create lazy component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Component = React.lazy(docsModules[path] as any);

        return {
          path: `/${folderName}`,
          name,
          element: <Component />,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  return (
    <Router basename="/mysta-lib">
      <Routes>
        <Route element={<Layout routes={routes} />} path="/">
          <Route
            index
            element={<Navigate replace to={routes[0]?.path || '/'} />}
          />

          {routes.map((route) => (
            <Route
              element={
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center p-12 text-gray-500">
                      Loading component...
                    </div>
                  }
                >
                  {route.element}
                </Suspense>
              }
              key={route.path}
              path={route.path}
            />
          ))}

          <Route
            element={
              <div className="p-8 text-center text-gray-500">
                404 - Page documentation not found
              </div>
            }
            path="*"
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
