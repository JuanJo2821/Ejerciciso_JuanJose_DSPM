import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonIcon,
    IonLabel,
    IonText,
} from '@ionic/react';
import { wifiOutline, cellularOutline, cloudOfflineOutline } from 'ionicons/icons';
import { AuthContext } from '../context/AuthContext.jsx';
import useNetwork from '../hooks/useNetwork.jsx';

function Home() {
    const { user, cargando, logout } = useContext(AuthContext);
    const { isOnline, connectionType } = useNetwork();

    if (cargando) return null;
    if (!user) return <Navigate to="/login" replace />;

    const getIcon = () => {
        if (!isOnline) return cloudOfflineOutline;
        if (connectionType === 'wifi') return wifiOutline;
        return cellularOutline;
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Inicio</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonIcon icon={getIcon()} slot="start" />
                    <IonLabel>
                        <IonText color={isOnline ? 'success' : 'danger'}>
                            <h2>{isOnline ? 'Conectado' : 'Sin conexión'}</h2>
                        </IonText>
                        <p>Tipo: {connectionType ?? 'desconocido'}</p>
                    </IonLabel>
                </IonItem>

                <IonButton expand="block" routerLink="/contacts">
                    Contactos (Firestore)
                </IonButton>

                <IonButton expand="block" routerLink="/tasks">
                    Tareas (Realtime Database)
                </IonButton>

                <IonButton expand="block" routerLink="/fruits">
                    Frutas (Dexie)
                </IonButton>

                <IonButton expand="block" color="medium" onClick={handleLogout}>
                    Salir
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Home;
