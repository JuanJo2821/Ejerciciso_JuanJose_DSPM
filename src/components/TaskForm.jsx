// src/components/TaskForm.jsx
import { useState } from 'react';
import { IonButton } from '@ionic/react';

function TaskForm({ onAdd }) {
    const [texto, setTexto] = useState("");

    const handleSubmit = () => {
        if (texto === "") return;
        onAdd(texto);
        setTexto("");
    };

    return (
        <>
            <input 
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Nueva tarea"
            />
            <IonButton onClick={handleSubmit}>Agregar</IonButton>
        </>
    );
}

export default TaskForm;