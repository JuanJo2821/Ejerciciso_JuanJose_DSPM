
import ContactoItem from './ContactoItem.jsx';

function ListaContacto({ contactos, onDelete }) {
    return (
        <ul>
            {contactos.map((contacto) => {
                return (
                    <ContactoItem 
                        key={contacto.id} 
                        contacto={contacto} 
                        onDelete={onDelete} 
                    />
                );
            })}
        </ul>
    );
}

export default ListaContacto;