import { Navigate, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Tabs from './pages/Tabs';
import Detalle from './pages/Detalle';

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

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" element={<Login />} />
        <Route path="/tabs/*" element={<Tabs />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/" element={
          localStorage.getItem("logged") === "true"
            ? <Navigate to="/tabs/visitas" />
            : <Navigate to="/login" />
        } />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;