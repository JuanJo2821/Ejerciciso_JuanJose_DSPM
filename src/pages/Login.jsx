// src/pages/Login.jsx
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

// Ojo: aquí no navegamos a mano tras el login. En cuanto login()
// actualiza el usuario en el AuthContext, es la ruta "/login" en
// App.tsx la que decide mostrar <Navigate to="/tasks" /> en su lugar.
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            await login(email, password);
        } catch (error) {
            alert(error.message);
        }
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
                    placeholder="Email"
                    onIonChange={(e) => setEmail(e.detail.value)}
                />

                <IonInput
                    type="password"
                    placeholder="Contraseña"
                    onIonChange={(e) => setPassword(e.detail.value)}
                />

                <IonButton expand="block" onClick={handleLogin}>
                    Ingresar
                </IonButton>

                <p>
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </p>
            </IonContent>
        </IonPage>
    );
}

export default Login;