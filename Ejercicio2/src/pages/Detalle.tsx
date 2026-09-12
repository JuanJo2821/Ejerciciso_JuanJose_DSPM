import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonBackButton } from '@ionic/react';

interface Visita {
    id: number;
    paciente: string;
    hora: string;
    estado: string;
}

const SIGUIENTE_ESTADO: Record<string, string> = {
    pendiente: "en_camino",
    en_camino: "finalizada",
    finalizada: "finalizada",
};

const Detalle: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [visita, setVisita] = useState<Visita | null>(null);

    useEffect(() => {
        const visitas: Visita[] = JSON.parse(localStorage.getItem("visitas") || "[]");
        const encontrada = visitas.find(v => v.id === Number(id));
        setVisita(encontrada || null);
    }, [id]);

    const cambiarEstado = () => {
        const visitas: Visita[] = JSON.parse(localStorage.getItem("visitas") || "[]");
        const actualizadas = visitas.map(v =>
            v.id === Number(id) ? { ...v, estado: SIGUIENTE_ESTADO[v.estado] } : v
        );
        localStorage.setItem("visitas", JSON.stringify(actualizadas));
        setVisita(actualizadas.find(v => v.id === Number(id)) || null);
    };

    if (!visita) {
        return <p>Cargando...</p>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/visitas" />
                    </IonButtons>
                    <IonTitle>Detalle Visita</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2>{visita.paciente}</h2>
                <p>Hora: {visita.hora}</p>
                <p>Estado actual: {visita.estado}</p>
                {visita.estado !== "finalizada" && (
                    <IonButton onClick={cambiarEstado}>
                        Avanzar a "{SIGUIENTE_ESTADO[visita.estado]}"
                    </IonButton>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Detalle;