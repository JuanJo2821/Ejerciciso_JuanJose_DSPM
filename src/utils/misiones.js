export const MISIONES = [
    {
        id: 1,
        titulo: 'Tomar una foto',
        descripcion: 'Toma una foto con la cámara y guárdala',
        puntos: 30,
        ruta: '/mision/1',
    },
    {
        id: 2,
        titulo: 'Moverse más de 30 metros',
        descripcion: 'Camina más de 30 metros desde tu posición original',
        puntos: 50,
        ruta: '/mision/2',
    },
    {
        id: 3,
        titulo: 'Quedarse quieto 10 segundos',
        descripcion: 'Mantente quieto 10 segundos y el celular vibrará',
        puntos: 40,
        ruta: '/mision/3',
    },
];

export const DISTANCIA_META = 30;
export const SEGUNDOS_QUIETO = 10;

export const distanciaEnMetros = (lat1, lon1, lat2, lon2) => {
    const radioTierra = 6371000;
    const aRadianes = (grados) => (grados * Math.PI) / 180;

    const dLat = aRadianes(lat2 - lat1);
    const dLon = aRadianes(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(aRadianes(lat1)) *
            Math.cos(aRadianes(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return radioTierra * c;
};
