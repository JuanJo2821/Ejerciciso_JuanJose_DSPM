import { useNavigate } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';

const Perfil: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("logged");
        navigate("/login");
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar><IonTitle>Perfil</IonTitle></IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <p>Dr(a). Médico general</p>
                <IonButton onClick={handleLogout} color="danger">Cerrar sesión</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Perfil;