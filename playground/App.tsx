import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';

// Lazy loading components (similar to Vue's dynamic import)
const ButtonDocs = lazy(() => import('./docs/button/ButtonDocs'));
const IconDocs = lazy(() => import('./docs/icon/IconDocs'));
const FormDocs = lazy(() => import('./docs/form/FormDocs'));
// Add more lazy imports as needed

const App = () => {
  return (
    <Router basename="/mysta-lib">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/button" replace />} />
          <Route path="/button" element={<ButtonDocs />} />
          <Route path="/icon" element={<IconDocs />} />
          <Route path="/form" element={<FormDocs />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
          {/* Add more routes as needed */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
