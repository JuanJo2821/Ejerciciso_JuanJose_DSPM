import { useState, useContext } from 'react';
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
    IonList,
    IonButton,
    IonSpinner,
    IonText,
    IonButtons,
    IonIcon,
} from '@ionic/react';
import { trashOutline, createOutline } from 'ionicons/icons';
import { AuthContext } from '../context/AuthContext.jsx';
import useDexie from '../hooks/useDexie.jsx';

const Fruits = () => {
    const [nombre, setNombre] = useState('');
    const [editando, setEditando] = useState(null);

    const { user, cargando } = useContext(AuthContext);
    const { manualResults, results, isPending, error, getAll, add, update, deleteItem } =
        useDexie('frutas');

    if (cargando) return null;
    if (!user) return <Navigate to="/login" replace />;

    const handleGuardar = async () => {
        if (!nombre.trim()) return;

        if (editando !== null) {
            await update(editando, { nombre: nombre.trim() });
            setEditando(null);
        } else {
            await add({ nombre: nombre.trim() });
        }

        setNombre('');
    };

    const handleEditar = (fruta) => {
        setEditando(fruta.id);
        setNombre(fruta.nombre);
    };

    const handleCancelar = () => {
        setEditando(null);
        setNombre('');
    };

    const handleEliminar = async (id) => {
        await deleteItem(id);
        if (editando === id) {
            handleCancelar();
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Frutas</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonButton fill="clear" routerLink="/home">
                    Inicio
                </IonButton>

                <IonItem>
                    <IonInput
                        value={nombre}
                        placeholder="Nombre de la frta"
                        onIonChange={(e) => setNombre(e.detail.value ?? '')}
                    />
                </IonItem>

                <IonButton
                    expand="block"
                    className="ion-margin-top"
                    onClick={handleGuardar}
                    disabled={isPending}
                >
                    {isPending ? (
                        <IonSpinner name="crescent" />
                    ) : editando !== null ? (
                        'Guardar cambios'
                    ) : (
                        'Agregar'
                    )}
                </IonButton>

                {editando !== null && (
                    <IonButton expand="block" fill="clear" onClick={handleCancelar}>
                        Cancelar edición
                    </IonButton>
                )}

                {error && (
                    <IonText color="danger">
                        <p>{error}</p>
                    </IonText>
                )}

                <IonList className="ion-margin-top">
                    {results.map((fruta) => (
                        <IonItem key={fruta.id}>
                            <IonLabel>{fruta.nombre}</IonLabel>
                            <IonButtons slot="end">
                                <IonButton onClick={() => handleEditar(fruta)}>
                                    <IonIcon icon={createOutline} />
                                </IonButton>
                                <IonButton color="danger" onClick={() => handleEliminar(fruta.id)}>
                                    <IonIcon icon={trashOutline} />
                                </IonButton>
                            </IonButtons>
                        </IonItem>
                    ))}
                </IonList>

                <IonButton expand="block" fill="outline" onClick={getAll}>
                    Leer con getAll
                </IonButton>

                <IonList>
                    {manualResults.map((fruta) => (
                        <IonItem key={fruta.id}>
                            <IonLabel>{fruta.nombre}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Fruits;
