import { useContext, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MisionFoto from './pages/MisionFoto';
import MisionMovimiento from './pages/MisionMovimiento';
import MisionQuieto from './pages/MisionQuieto';
import Results from './pages/Results';
import { AuthContext } from './context/AuthContext.jsx';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';

setupIonicReact();

function LoginRoute() {
  const { user, cargando } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/home', { replace: true });
  }, [user]);

  if (cargando || user) return null;
  return <Login />;
}

function RegisterRoute() {
  const { user, cargando } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/home', { replace: true });
  }, [user]);

  if (cargando || user) return null;
  return <Register />;
}

function Inicio() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home', { replace: true });
  }, []);

  return null;
}

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/register" element={<RegisterRoute />} />

        <Route path="/home" element={<Home />} />
        <Route path="/mision/1" element={<MisionFoto />} />
        <Route path="/mision/2" element={<MisionMovimiento />} />
        <Route path="/mision/3" element={<MisionQuieto />} />
        <Route path="/results" element={<Results />} />

        <Route path="/" element={<Inicio />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;