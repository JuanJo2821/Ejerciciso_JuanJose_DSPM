import { useEffect, useState } from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import { supabase } from './lib/supabase';
import Login from './pages/Login';
import Tareas from './pages/Tareas';

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

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCargando(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_evento, nueva) => {
      setSession(nueva);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <IonApp>
      {cargando ? null : session ? <Tareas /> : <Login />}
    </IonApp>
  );
};

export default App;
