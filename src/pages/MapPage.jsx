import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
} from '@ionic/react';
import MapView from '../components/MapComponent';

const MapPage = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Mapa</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <MapView />
            </IonContent>
        </IonPage>
    );
};

export default MapPage;
