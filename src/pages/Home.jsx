// src/pages/Home.jsx
import { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';

function Home() {
    const [tareas, setTareas] = useState([]);

    const addTarea = (texto) => {
        const nueva = {
            id: Date.now(),
            texto: texto,
            completada: false,
        };
        setTareas(prev => [...prev, nueva]);
    };

    const deleteTarea = (id) => {
        setTareas(prev => prev.filter(t => t.id !== id));
    };

    const toggleTarea = (id) => {
        setTareas(prev => prev.map(t => 
            t.id === id ? { ...t, completada: !t.completada } : t
        ));
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Mis Tareas</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <TaskForm onAdd={addTarea} />
                <TaskList tareas={tareas} onDelete={deleteTarea} onToggle={toggleTarea} />
            </IonContent>
        </IonPage>
    );
}

export default Home;