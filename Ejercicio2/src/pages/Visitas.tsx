import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';

interface Visita {
    id: number;
    paciente: string;
    hora: string;
    estado: string;
}

const VISITAS_INICIALES: Visita[] = [
    { id: 1, paciente: "Ana Gómez", hora: "09:00", estado: "pendiente" },
    { id: 2, paciente: "Carlos Ruiz", hora: "10:30", estado: "en_camino" },
    { id: 3, paciente: "Laura Pérez", hora: "11:15", estado: "finalizada" },
];

const Visitas: React.FC = () => {
    const [visitas, setVisitas] = useState<Visita[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const guardadas = localStorage.getItem("visitas");
        if (guardadas) {
            setVisitas(JSON.parse(guardadas));
        } else {
            setVisitas(VISITAS_INICIALES);
            localStorage.setItem("visitas", JSON.stringify(VISITAS_INICIALES));
        }
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar><IonTitle>Visitas de hoy</IonTitle></IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {visitas.map((v) => (
                        <IonItem key={v.id} button onClick={() => navigate(`/detalle/${v.id}`)}>
                            <IonLabel>
                                <h2>{v.paciente}</h2>
                                <p>{v.hora} - {v.estado}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Visitas;