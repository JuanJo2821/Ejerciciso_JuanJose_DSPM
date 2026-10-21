import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "./db";

const useDexie = (table, filterFn = null) => {
  const [manualResults, setManualResults] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const liveResults =
    useLiveQuery(() => {
      if (filterFn) {
        return db[table].filter(filterFn).toArray();
      }
      return db[table].toArray();
    }, [table]) ?? [];

  const getAll = async () => {
    setIsPending(true);
    setError(null);
    try {
      let data;
      if (filterFn) {
        data = await db[table].filter(filterFn).toArray();
      } else {
        data = await db[table].toArray();
      }
      setManualResults(data);
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  const add = async (data) => {
    setIsPending(true);
    setError(null);
    try {
      const id = await db[table].add({
        ...data,
        createdAt: new Date().toISOString(),
      });
      setIsPending(false);
      return id;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return null;
    }
  };

  const update = async (id, data) => {
    setIsPending(true);
    setError(null);
    try {
      await db[table].update(id, data);
      setIsPending(false);
      return true;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  const deleteItem = async (id) => {
    setIsPending(true);
    setError(null);
    try {
      await db[table].delete(id);
      setIsPending(false);
      return true;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  return {
    results: liveResults,
    manualResults,
    isPending,
    error,
    getAll,
    add,
    update,
    deleteItem,
  };
};

export default useDexie;
