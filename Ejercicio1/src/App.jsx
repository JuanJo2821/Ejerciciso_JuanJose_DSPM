import { useState, useEffect } from 'react';
import Login from './Login.jsx';
import Pacientes from './Pacientes.jsx';

function App() {
    const [logueado, setLogueado] = useState(false);

    useEffect(() => {
        const sesion = localStorage.getItem('logueado');
        if (sesion === 'true') {
            setLogueado(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('logueado');
        setLogueado(false);
    };

    if (!logueado) {
        return <Login onLogin={() => setLogueado(true)} />;
    }

    return <Pacientes onLogout={handleLogout} />;
}

export default App;