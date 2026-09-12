import { useState, useEffect } from 'react';
import Buscador from './Buscador.jsx';
import FormularioPaciente from './FormularioPaciente.jsx';
import ListaPacientes from './ListaPacientes.jsx';

function Pacientes({ onLogout }) {
    const [pacientes, setPacientes] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        const guardados = JSON.parse(localStorage.getItem('pacientes') || '[]');
        setPacientes(guardados);
    }, []);

    const guardarPacientes = (nuevaLista) => {
        setPacientes(nuevaLista);
        localStorage.setItem('pacientes', JSON.stringify(nuevaLista));
    };

    const addPaciente = (paciente) => {
        const nuevo = { id: Date.now(), ...paciente };
        guardarPacientes([...pacientes, nuevo]);
    };

    const pacientesFiltrados = pacientes.filter((p) => {
        const texto = busqueda.toLowerCase();
        return (
            p.nombre.toLowerCase().includes(texto) ||
            p.apellido.toLowerCase().includes(texto) ||
            p.cc.toLowerCase().includes(texto)
        );
    });

    return (
        <div>
            <h2>Pacientes</h2>
            <button onClick={onLogout}>Cerrar sesión</button>

            <FormularioPaciente onAdd={addPaciente} />
            <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
            <ListaPacientes pacientes={pacientesFiltrados} />
        </div>
    );
}

export default Pacientes;