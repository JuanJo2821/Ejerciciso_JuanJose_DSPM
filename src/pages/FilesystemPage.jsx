import { useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonButton,
    IonText,
} from '@ionic/react';
import { useFilesystem } from '../hooks/useFilesystem.jsx';

const FilesystemPage = () => {
    const [resultado, setResultado] = useState('');

    const {
        writeFile, readFile,
        listFiles, deleteFile,
        error,
    } = useFilesystem();

    const onWriteFile = async () => {
        await writeFile({
            path: "mi-data.json",
            data: { nombre: "Jonathan", curso: "Ionic" },
        });
        setResultado('Archivo guardado');
    };

    const onReadFile = async () => {
        const data = await readFile({ path: "mi-data.json" });
        console.log(data);
        setResultado(JSON.stringify(data));
    };

    const onListFiles = async () => {
        const files = await listFiles({});
        console.log(files);
        setResultado(JSON.stringify(files.map((f) => f.name ?? f)));
    };

    const onDeleteFile = async () => {
        await deleteFile({ path: "mi-data.json" });
        setResultado('Archivo eliminado');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Archivos</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonButton expand="block" onClick={onWriteFile}>
                    Escribir archivo
                </IonButton>

                <IonButton expand="block" onClick={onReadFile}>
                    Leer archivo
                </IonButton>

                <IonButton expand="block" onClick={onListFiles}>
                    Listar archivos
                </IonButton>

                <IonButton expand="block" color="danger" onClick={onDeleteFile}>
                    Eliminar archivo
                </IonButton>

                <p>{resultado}</p>

                {error && (
                    <IonText color="danger">
                        <p>{error.message}</p>
                    </IonText>
                )}
            </IonContent>
        </IonPage>
    );
};

export default FilesystemPage;
