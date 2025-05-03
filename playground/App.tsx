import { lazy, Suspense } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
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
          <Route element={<Navigate replace to="/button" />} path="/" />
          <Route element={<ButtonDocs />} path="/button" />
          <Route element={<CardDocs />} path="/card" />
          <Route element={<DialogDocs />} path="/dialog" />
          <Route element={<DialogFormDocs />} path="/dialogform" />
          <Route element={<FormDocs />} path="/form" />
          <Route element={<KanbanDocs />} path="/kanban" />
          <Route element={<IconDocs />} path="/icon" />
          <Route element={<BaseInputDocs />} path="/inputtext" />
          <Route element={<PlaygroundDocs />} path="/playground" />
          <Route element={<div>404 - Page Not Found</div>} path="*" />
          {/* Add more routes as needed */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
