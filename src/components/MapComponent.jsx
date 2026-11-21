import { IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation";
import { useHaptics } from "../hooks/useHaptics";
import { useDevice } from "../hooks/useDevice";
import { useLocalNotifications } from "../hooks/useLocalNotifications";
import { useFilesystem } from "../hooks/useFilesystem";
import { getAddress } from "../services/opencagedata";
import "./MapComponent.css";

L.Marker.prototype.options.icon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([position?.latitude ?? 0, position?.longitude ?? 0]);
    }, [position]);
    return null;
};

const MapView = () => {
    const { position: currentPosition, getCurrentLocation, startTracking, stopTracking } = useGeolocation();
    const { vibrate } = useHaptics();
    const { battery, refresh } = useDevice();
    const { requestPermission, sendNotification } = useLocalNotifications();
    const { writeFile } = useFilesystem();
    const [path, setPath] = useState([]);
    const [ready, setReady] = useState(false);
    const [address, setAddress] = useState(null);
    const [tracking, setTracking] = useState(false);

    useEffect(() => {
        getCurrentLocation();
        requestPermission();
    }, []);

    useEffect(() => {
        if (currentPosition) {
            setReady(true);
            if (tracking) {
                setPath((prev) => [...prev, [currentPosition.latitude, currentPosition.longitude]]);
                refresh();
            }
        }
    }, [currentPosition]);

    useEffect(() => {
        if (tracking && battery?.batteryLevel < 0.2) {
            handleStop();
            sendNotification({
                id: Math.floor(Date.now() / 1000),
                title: "Batería baja",
                body: "Se detuvo el recorrido por batería baja",
            });
        }
    }, [battery]);

    const handleStart = async () => {
        await startTracking();
        await vibrate();
        setTracking(true);
    };

    const handleStop = async () => {
        await stopTracking();
        setTracking(false);
        if (path.length > 0) {
            await writeFile({
                path: `recorrido-${Date.now()}.json`,
                data: { puntos: path },
            });
            setPath([]);
        }
    };

    const handleGetAddress = async () => {
        const address = await getAddress(currentPosition.latitude, currentPosition.longitude);
        console.log(address);
        setAddress(address);
    };

    return (
        <>
            <IonButton onClick={() => handleStart()}>Iniciar</IonButton>
            <IonButton onClick={() => handleStop()}>Detener</IonButton>
            <IonButton onClick={() => getCurrentLocation()}>Obtener ubicación</IonButton>
            <IonButton onClick={() => handleGetAddress()}>Obtener dirección</IonButton>
            <p>{address?.results[0]?.formatted}</p>

            {ready ? (
                <MapContainer
                    center={[currentPosition.latitude, currentPosition.longitude]}
                    zoom={18}
                    className="map-container"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <RecenterMap position={currentPosition} />
                    <Marker position={[currentPosition.latitude, currentPosition.longitude]} />
                    <Polyline positions={path} />
                </MapContainer>
            ) : (
                <div
                    className="map-container"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    <p>Obteniendo ubicación...</p>
                </div>
            )}
        </>
    );
};

export default MapView;
