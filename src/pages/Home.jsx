import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonProgressBar,
    IonText,
} from '@ionic/react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useProgreso } from '../context/ProgresoContext.jsx';

function Home() {
    const { user, cargando, logout } = useContext(AuthContext);
    const { lista, puntos, completadas, total, porcentaje } = useProgreso();
    const navigate = useNavigate();

    if (cargando) return null;
    if (!user) return <Navigate to="/login" replace />;

    const misionDosCompletada = lista.find((m) => m.id === 2).completed;

    const handleLogout = async () => {
        await logout();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Misiones</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonText>
                    <h2>Puntos: {puntos}</h2>
                </IonText>

                <IonProgressBar value={porcentaje / 100} />
                <p>
                    {porcentaje}% completado - {completadas} / {total} misiones
                </p>

                <IonList>
                    {lista.map((mision) => {
                        const bloqueada = mision.id === 3 && !misionDosCompletada;

                        return (
                            <IonItem
                                key={mision.id}
                                button
                                detail
                                onClick={() => navigate(mision.ruta)}
                                disabled={bloqueada}
                            >
                                <IonLabel>
                                    <h2>{mision.titulo}</h2>
                                    <p>{mision.descripcion}</p>
                                    <p>{mision.puntos} puntos</p>
                                </IonLabel>
                                <IonBadge
                                    slot="end"
                                    color={mision.completed ? 'success' : 'medium'}
                                >
                                    {mision.completed
                                        ? 'Completada'
                                        : bloqueada
                                          ? 'Bloqueada'
                                          : 'Pendiente'}
                                </IonBadge>
                            </IonItem>
                        );
                    })}
                </IonList>

                <IonButton expand="block" onClick={() => navigate('/results')}>
                    Ver resultados
                </IonButton>

                <IonButton expand="block" color="medium" onClick={handleLogout}>
                    Salir
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Home;