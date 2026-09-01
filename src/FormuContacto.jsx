
import { useState } from 'react';

function FormuContacto({ onAdd }) {
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");

    const handleSubmit = () => {
        if (nombre === "" || telefono === "") {
            return;
        }
        onAdd(nombre, telefono);
        setNombre("");
        setTelefono("");
    };

    return (
        <>
            <input 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
            />
            <input 
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Teléfono"
            />
            <button onClick={handleSubmit}>Agregar</button>
        </>
    );
}

export default FormuContacto;