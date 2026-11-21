import { useEffect, useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonContent,
    IonButton,
    IonInput,
    IonList,
    IonItem,
    IonCheckbox,
    IonAvatar,
} from '@ionic/react';
import { supabase } from '../lib/supabase';
import { useCamera } from '../hooks/useCamera';

function Tareas() {
    const [tareas, setTareas] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [url, setUrl] = useState(null);
    const { photo, takePhoto } = useCamera();

    const cargar = async () => {
        const { data, error } = await supabase
            .from('tareas')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) console.error(error);
        else setTareas(data);
    };

    const crear = (titulo) => supabase.from('tareas').insert({ titulo });

    const completar = (id, valor) => supabase.from('tareas')
        .update({ completada: valor })
        .eq('id', id);

    const borrar = (id) => supabase.from('tareas').delete().eq('id', id);

    const agregar = async () => {
        if (!titulo) return;
        const { error } = await crear(titulo);
        if (error) return alert(error.message);
        setTitulo('');
    };

    const subirAvatar = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const respuesta = await fetch(photo);
        const archivo = await respuesta.blob();
        const ruta = `${user.id}/${Date.now()}.jpg`;

        const { error } = await supabase.storage.from('avatars')
            .upload(ruta, archivo, { upsert: true, contentType: 'image/jpeg' });
        if (error) return alert(error.message);

        const { data } = supabase.storage.from('avatars')
            .getPublicUrl(ruta);
        setUrl(data.publicUrl);
    };

    useEffect(() => { cargar() }, []);

    useEffect(() => {
        const canal = supabase
            .channel('cambios-tareas')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'tareas' },
                (payload) => {
                    if (payload.eventType === 'INSERT')
                        setTareas(t => [payload.new, ...t]);
                    if (payload.eventType === 'UPDATE')
                        setTareas(t => t.map(x => x.id === payload.new.id ? payload.new : x));
                    if (payload.eventType === 'DELETE')
                        setTareas(t => t.filter(x => x.id !== payload.old.id));
                })
            .subscribe();

        return () => supabase.removeChannel(canal);
    }, []);

    useEffect(() => {
        if (photo) subirAvatar();
    }, [photo]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tareas</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => supabase.auth.signOut()}>
                            Salir
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {url && (
                    <IonAvatar>
                        <img src={url} />
                    </IonAvatar>
                )}

                <IonButton expand="block" onClick={takePhoto}>
                    Tomar foto de avatar
                </IonButton>

                <IonInput
                    placeholder="Nueva tarea"
                    value={titulo}
                    onIonChange={(e) => setTitulo(e.detail.value)}
                />

                <IonButton expand="block" onClick={agregar}>
                    Agregar
                </IonButton>

                <IonList>
                    {tareas.map((tarea) => (
                        <IonItem key={tarea.id}>
                            <IonCheckbox
                                checked={tarea.completada}
                                onIonChange={(e) => completar(tarea.id, e.detail.checked)}
                            >
                                {tarea.titulo}
                            </IonCheckbox>
                            <IonButton
                                slot="end"
                                color="danger"
                                fill="clear"
                                onClick={() => borrar(tarea.id)}
                            >
                                Borrar
                            </IonButton>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Tareas;
