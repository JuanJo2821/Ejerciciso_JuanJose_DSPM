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
import { useHaptics } from '../hooks/useHaptics.jsx';

const HapticsPage = () => {
    const { impact, notify, vibrate } = useHaptics();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Vibración</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonButton expand="block" onClick={() => impact("light")}>
                    Impacto suave
                </IonButton>

                <IonButton expand="block" onClick={() => impact("heavy")}>
                    Impacto fuerte
                </IonButton>

                <IonButton expand="block" onClick={() => notify("success")}>
                    Éxito
                </IonButton>

                <IonButton expand="block" onClick={() => notify("error")}>
                    Error
                </IonButton>

                <IonButton expand="block" onClick={() => vibrate(200)}>
                    Vibrar
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default HapticsPage;
