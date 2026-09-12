import { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';

interface PacienteMedico {
    id: number;
    nombre: string;
}

const Pacientes: React.FC = () => {
    const [pacientes, setPacientes] = useState<PacienteMedico[]>([]);
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        const guardados = JSON.parse(localStorage.getItem("pacientes_medico") || "[]");
        setPacientes(guardados);
    }, []);

    const addPaciente = () => {
        if (nombre.trim() === "") return;
        const nuevaLista = [...pacientes, { id: Date.now(), nombre }];
        setPacientes(nuevaLista);
        localStorage.setItem("pacientes_medico", JSON.stringify(nuevaLista));
        setNombre("");
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar><IonTitle>Pacientes</IonTitle></IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del paciente" />
                <IonButton onClick={addPaciente}>Agregar</IonButton>

                <IonList>
                    {pacientes.map((p) => (
                        <IonItem key={p.id}>
                            <IonLabel>{p.nombre}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Pacientes;