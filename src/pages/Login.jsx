import { useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
} from '@ionic/react';
import { supabase } from '../lib/supabase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
    };

    const registrar = async () => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: window.location.origin,
            },
        });
        if (error) return alert(error.message);
        alert('Revisa tu correo para confirmar la cuenta');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonInput
                    type="email"
                    placeholder="Email"
                    onIonChange={(e) => setEmail(e.detail.value)}
                />

                <IonInput
                    type="password"
                    placeholder="Contraseña"
                    onIonChange={(e) => setPassword(e.detail.value)}
                />

                <IonButton expand="block" onClick={login}>
                    Ingresar
                </IonButton>

                <IonButton expand="block" fill="outline" onClick={registrar}>
                    Registrarse
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Login;
