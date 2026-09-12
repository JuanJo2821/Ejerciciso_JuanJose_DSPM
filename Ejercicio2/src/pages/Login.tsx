import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonToast } from '@ionic/react';

const USUARIOS = [
    { usuario: "medico", password: "1234" },
];

const Login: React.FC = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarError, setMostrarError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        const encontrado = USUARIOS.find(
            u => u.usuario === usuario && u.password === password
        );

        if (encontrado) {
            localStorage.setItem("logged", "true");
            navigate("/tabs/visitas");
        } else {
            setMostrarError(true);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar><IonTitle>Login Médico</IonTitle></IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <input value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Usuario" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
                <IonButton onClick={handleLogin}>Ingresar</IonButton>

                <IonToast
                    isOpen={mostrarError}
                    message="Usuario o contraseña incorrectos"
                    duration={2000}
                    color="danger"
                    onDidDismiss={() => setMostrarError(false)}
                />
            </IonContent>
        </IonPage>
    );
};

export default Login;