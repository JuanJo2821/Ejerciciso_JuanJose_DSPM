import { useState } from 'react';

function FormularioPaciente({ onAdd }) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [cc, setCc] = useState("");
    const [telefono, setTelefono] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (nombre.trim() === "" || apellido.trim() === "" || cc.trim() === "") {
            setError("Nombre, apellido y CC son obligatorios");
            return;
        }
        if (!/^\d+$/.test(cc)) {
            setError("La CC solo debe contener números");
            return;
        }

        onAdd({ nombre, apellido, cc, telefono });
        setNombre("");
        setApellido("");
        setCc("");
        setTelefono("");
        setError("");
    };

    return (
        <div>
            <h3>Agregar paciente</h3>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
            <input value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" />
            <input value={cc} onChange={(e) => setCc(e.target.value)} placeholder="CC" />
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" />
            <button onClick={handleSubmit}>Agregar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default FormularioPaciente;