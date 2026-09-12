import { Navigate, Route } from 'react-router-dom';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { calendarOutline, peopleOutline, personOutline } from 'ionicons/icons';
import Visitas from './Visitas';
import Pacientes from './Pacientes';
import Perfil from './Perfil';

const Tabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/tabs/visitas" element={<Visitas />} />
                <Route path="/tabs/pacientes" element={<Pacientes />} />
                <Route path="/tabs/perfil" element={<Perfil />} />
                <Route path="/tabs" element={<Navigate to="/tabs/visitas" />} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
                <IonTabButton tab="visitas" href="/tabs/visitas">
                    <IonIcon icon={calendarOutline} />
                    <IonLabel>Visitas</IonLabel>
                </IonTabButton>
                <IonTabButton tab="pacientes" href="/tabs/pacientes">
                    <IonIcon icon={peopleOutline} />
                    <IonLabel>Pacientes</IonLabel>
                </IonTabButton>
                <IonTabButton tab="perfil" href="/tabs/perfil">
                    <IonIcon icon={personOutline} />
                    <IonLabel>Perfil</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default Tabs;