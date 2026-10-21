import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonButton,
} from '@ionic/react';
import { useCamera } from '../hooks/useCamera.jsx';

const CameraPage = () => {
    const { photo, takePhoto } = useCamera();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Cámara</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonButton expand="block" onClick={takePhoto}>
                    Tomar Foto
                </IonButton>

                {photo && <img src={photo} />}
            </IonContent>
        </IonPage>
    );
};

export default CameraPage;
