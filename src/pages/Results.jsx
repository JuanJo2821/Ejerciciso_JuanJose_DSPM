import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonText,
} from '@ionic/react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useProgreso } from '../context/ProgresoContext.jsx';

function Results() {
    const { user, cargando } = useContext(AuthContext);
    const navigate = useNavigate();
    const { puntos, completadas, total, usuarios, reiniciar } = useProgreso();

    if (cargando) return null;
    if (!user) return <Navigate to="/login" replace />;

    const estado =
        completadas === total
            ? 'Completado'
            : completadas === 0
              ? 'Sin iniciar'
              : 'En progreso';

    const nombreDe = (email) => (email || 'usuario').split('@')[0];

    const otros = usuarios
        .filter((u) => u.id !== user.uid)
        .map((u) => ({ uid: u.id, nombre: nombreDe(u.email), points: u.points || 0 }));

    const todos = [...otros, { uid: user.uid, nombre: nombreDe(user.email), points: puntos }].sort(
        (a, b) => b.points - a.points
    );

    const miPosicion = todos.findIndex((u) => u.uid === user.uid);

    const top =
        miPosicion < 5
            ? todos.slice(0, 5)
            : [...todos.slice(0, 4), todos[miPosicion]];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Resultados</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <h2>Puntos totales: {puntos}</h2>
                <p>
                    Misiones completadas: {completadas} / {total}
                </p>
                <p>Estado general: {estado}</p>

                <h3>Ranking Top 5</h3>
                <IonList>
                    {top.map((u) => {
                        const posicion = todos.findIndex((t) => t.uid === u.uid) + 1;
                        const esMio = u.uid === user.uid;

                        return (
                            <IonItem key={u.uid} color={esMio ? 'light' : undefined}>
                                <IonLabel>
                                    <h2>
                                        {posicion}. {u.nombre} {esMio && '(tú)'}
                                    </h2>
                                </IonLabel>
                                <IonText slot="end">{u.points} pts</IonText>
                            </IonItem>
                        );
                    })}
                </IonList>

                <IonButton expand="block" color="danger" fill="outline" onClick={reiniciar}>
                    Reiniciar misiones
                </IonButton>

                <IonButton expand="block" fill="clear" onClick={() => navigate('/home')}>
                    Volver a misiones
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Results;