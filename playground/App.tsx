import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

const ButtonDocs = lazy(() => import('./docs/button/ButtonDocs'));
const IconDocs = lazy(() => import('./docs/icon/IconDocs'));
const BaseInputDocs = lazy(() => import('./docs/inputtext/InputTextDocs'));
const FormDocs = lazy(() => import('./docs/form/FormDocs'));
const DialogDocs = lazy(() => import('./docs/dialog/DialogDocs'));
const DialogFormDocs = lazy(() => import('./docs/dialogform/DialogFormDocs'));
const PlaygroundDocs = lazy(() => import('./docs/playground/PlaygroundDocs'));
const CardDocs = lazy(() => import('./docs/card/CardDocs'));
const KanbanDocs = lazy(() => import('./docs/kanban/KanbanDocs'));

const App = () => {
  return (
    <Router basename="/mysta-lib">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/button" replace />} />
          <Route path="/button" element={<ButtonDocs />} />
          <Route path="/card" element={<CardDocs />} />
          <Route path="/dialog" element={<DialogDocs />} />
          <Route path="/dialogform" element={<DialogFormDocs />} />
          <Route path="/form" element={<FormDocs />} />
          <Route path="/kanban" element={<KanbanDocs />} />
          <Route path="/icon" element={<IconDocs />} />
          <Route path="/inputtext" element={<BaseInputDocs />} />
          <Route path="/playground" element={<PlaygroundDocs />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
          {/* Add more routes as needed */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
