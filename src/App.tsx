import { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import TasksList from './pages/TasksList';
import TaskFormPage from './pages/TaskFormPage';
import TaskDetail from './pages/TaskDetail';
import { AuthContext } from './context/AuthContext.jsx';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

// Si ya hay sesión iniciada, /login y /register no deben mostrar el
// formulario: deben mandarte directo a /tasks.
function LoginRoute() {
  const { user, cargando } = useContext(AuthContext);
  if (cargando) return null;
  return user ? <Navigate to="/tasks" replace /> : <Login />;
}

function RegisterRoute() {
  const { user, cargando } = useContext(AuthContext);
  if (cargando) return null;
  return user ? <Navigate to="/tasks" replace /> : <Register />;
}

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/register" element={<RegisterRoute />} />

        <Route path="/tasks" element={<TasksList />} />
        <Route path="/tasks/new" element={<TaskFormPage />} />
        <Route path="/tasks/edit/:id" element={<TaskFormPage />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />

        <Route path="/" element={<Navigate to="/tasks" replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;