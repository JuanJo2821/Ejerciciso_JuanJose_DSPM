function Buscador({ busqueda, setBusqueda }) {
    return (
        <input 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, apellido o CC"
        />
    );
}

export default Buscador;