
import { useState, useEffect } from 'react';
import Cargando from './Carga.jsx'
import ListaContacto from './ListaContacto.jsx';
import FormuContacto from './FormuContacto.jsx';

function Contactos() {
    const [contactos, setContactos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const datosIniciales = [
                { id: 1, nombre: "Ana", telefono: "3001112233" },
                { id: 2, nombre: "Pedro", telefono: "3004445566" },
                { id: 3, nombre: "Luisa", telefono: "3007778899" },
            ];
            setContactos(datosIniciales);
            setCargando(false);
        }, 1500);
    }, []);

    const addContacto = (nombre, telefono) => {
        const nuevo = {
            id: Date.now(),
            nombre: nombre,
            telefono: telefono,
        };
        setContactos(prev => [...prev, nuevo]);
    };

    const deleteContacto = (id) => {
        setContactos(prev => prev.filter(c => c.id !== id));
    };

    if (cargando) {
        return <Cargando />;
    }

    return (
        <>
            <h2>Mis Contactos</h2>
            <FormuContacto onAdd={addContacto} />
            <ListaContacto contactos={contactos} onDelete={deleteContacto} />
        </>
    );
}

export default Contactos;