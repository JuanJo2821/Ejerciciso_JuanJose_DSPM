import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonList,
    IonSpinner,
    IonText,
    IonIcon,
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { AuthContext } from '../context/AuthContext.jsx';
import useCollection from '../hooks/useCollection.jsx';
import useNetwork from '../hooks/useNetwork.jsx';

function Contacts() {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');

    const { user, cargando } = useContext(AuthContext);
    const { isOnline } = useNetwork();
    const { results, isPending, error, getAll, add, remove } = useCollection('contactos');

    useEffect(() => {
        if (user && isOnline) {
            getAll();
        }
    }, [user, isOnline]);

    if (cargando) return null;
    if (!user) return <Navigate to="/login" replace />;

    const contactos = [...results].sort(
        (a, b) => (a.createdAt?.seconds ?? 0) - (b.createdAt?.seconds ?? 0)
    );

    const handleAgregar = async () => {
        if (!nombre.trim()) return;
        const creado = await add({
            nombre: nombre.trim(),
            telefono: telefono.trim(),
        });
        if (creado) {
            setNombre('');
            setTelefono('');
            await getAll();
        }
    };

    const handleEliminar = async (id) => {
        const eliminado = await remove(id);
        if (eliminado) {
            await getAll();
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Contactos</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonButton fill="clear" routerLink="/home">
                    Inicio
                </IonButton>

                {!isOnline && (
                    <IonText color="danger">
                        <p>Sin conexión: no puedes agregar ni eliminar contactos.</p>
                    </IonText>
                )}

                <IonItem>
                    <IonInput
                        value={nombre}
                        placeholder="Nombre"
                        onIonChange={(e) => setNombre(e.detail.value ?? '')}
                    />
                </IonItem>

                <IonItem>
                    <IonInput
                        value={telefono}
                        placeholder="Teléfono"
                        onIonChange={(e) => setTelefono(e.detail.value ?? '')}
                    />
                </IonItem>

                <IonButton
                    expand="block"
                    className="ion-margin-top"
                    onClick={handleAgregar}
                    disabled={!isOnline || isPending}
                >
                    {isPending ? <IonSpinner name="crescent" /> : 'Agregar'}
                </IonButton>

                {error && (
                    <IonText color="danger">
                        <p>{error}</p>
                    </IonText>
                )}

                <IonList className="ion-margin-top">
                    {contactos.map((contacto) => (
                        <IonItem key={contacto.id}>
                            <IonLabel>
                                <h2>{contacto.nombre}</h2>
                                <p>{contacto.telefono}</p>
                            </IonLabel>
                            <IonButton
                                fill="clear"
                                color="danger"
                                onClick={() => handleEliminar(contacto.id)}
                                disabled={!isOnline || isPending}
                            >
                                <IonIcon icon={trashOutline} />
                            </IonButton>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Contacts;
