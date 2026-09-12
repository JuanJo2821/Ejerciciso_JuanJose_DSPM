import { useState } from 'react';

const USUARIOS = [
    { usuario: "admin", password: "1234" },
    { usuario: "medico", password: "5678" },
];

function Login({ onLogin }) {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        const encontrado = USUARIOS.find(
            u => u.usuario === usuario && u.password === password
        );

        if (encontrado) {
            localStorage.setItem('logueado', 'true');
            setError("");
            onLogin();
        } else {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div>
            <h2>Login - MediClinic</h2>
            <input 
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Usuario"
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
            />
            <button onClick={handleSubmit}>Ingresar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login;