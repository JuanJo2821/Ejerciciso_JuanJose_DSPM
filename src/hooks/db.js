import Dexie from "dexie";

const db = new Dexie("MiAppDB");

db.version(1).stores({
  frutas: "++id, nombre, createdAt",
});

db.version(2).stores({
  frutas: "++id, nombre, proveedor, fechaCosecha, createdAt",
});

export default db;
