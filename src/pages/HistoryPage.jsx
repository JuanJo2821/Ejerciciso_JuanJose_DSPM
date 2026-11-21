import { useEffect, useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonList,
    IonItem,
} from '@ionic/react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import { useFilesystem } from '../hooks/useFilesystem';
import '../components/MapComponent.css';

const HistoryPage = () => {
    const { listFiles, readFile } = useFilesystem();
    const [files, setFiles] = useState([]);
    const [path, setPath] = useState(null);

    const loadFiles = async () => {
        const result = await listFiles({});
        setFiles(result.filter((f) => f.name.startsWith('recorrido-')));
    };

    useEffect(() => {
        loadFiles();
    }, []);

    const onSelect = async (name) => {
        const data = await readFile({ path: name });
        setPath(data.puntos);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Historial</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonList>
                    {files.map((f) => (
                        <IonItem key={f.name} button onClick={() => onSelect(f.name)}>
                            {new Date(Number(f.name.replace('recorrido-', '').replace('.json', ''))).toLocaleString()}
                        </IonItem>
                    ))}
                </IonList>

                {path && (
                    <MapContainer
                        key={path.length + String(path[0])}
                        center={path[0]}
                        zoom={18}
                        className="map-container"
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Polyline positions={path} />
                    </MapContainer>
                )}
            </IonContent>
        </IonPage>
    );
};

export default HistoryPage;
