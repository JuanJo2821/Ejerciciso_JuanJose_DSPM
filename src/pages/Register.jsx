// src/pages/Register.jsx
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
} from '@ionic/react';
import { AuthContext } from '../context/AuthContext.jsx';

// Mismo motivo que en Login: no navegamos a mano, es la ruta
// "/register" en App.tsx la que muestra <Navigate to="/tasks" />
// en cuanto el AuthContext confirma que ya hay usuario.
function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { register } = useContext(AuthContext);

    const handleRegister = async () => {
        try {
            await register(email, password);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registro</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonInput
                    placeholder="Email"
                    onIonChange={(e) => setEmail(e.detail.value)}
                />

                <IonInput
                    type="password"
                    placeholder="Contraseña"
                    onIonChange={(e) => setPassword(e.detail.value)}
                />

                <IonButton expand="block" onClick={handleRegister}>
                    Crear cuenta
                </IonButton>

                <p>
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </IonContent>
        </IonPage>
    );
}

export default Register;