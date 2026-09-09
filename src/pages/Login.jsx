// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (email === "user@mail.com" && password === "123") {
            localStorage.setItem("logged", "true");
            navigate("/home");
        } else {
            setError("Usuario o contraseña incorrectos");
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
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <IonButton onClick={handleLogin}>Login</IonButton>
                {error && <p>{error}</p>}
            </IonContent>
        </IonPage>
    );
}

export default Login;