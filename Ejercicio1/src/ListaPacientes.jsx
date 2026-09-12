function ListaPacientes({ pacientes }) {
    return (
        <ul>
            {pacientes.map((p) => (
                <li key={p.id}>
                    {p.nombre} {p.apellido} - CC: {p.cc} - Tel: {p.telefono}
                </li>
            ))}
        </ul>
    );
}

export default ListaPacientes;