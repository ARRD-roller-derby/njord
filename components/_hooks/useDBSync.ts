/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useIsOnline from "./online.hook";
import { indexDB } from "../../db/indexDB.connect";

export default function useDBSync(
  url: string,
  dbField: string,
  body: Object = {}
) {
  const isOnline = useIsOnline(),
    [data, setData] = useState<any>([]),
    [error, setError] = useState<Error>();

  async function handleFetch(newBody?: object) {
    try {
      const { data: resData } = await toast.promise(
        axios.post("/api/" + url, newBody || body),
        {
          pending: "Synchronisation",
          error: "Un problème est survenue !",
        },
        { toastId: url }
      );

      if (JSON.stringify(resData) !== JSON.stringify(data)) {
        setData(resData);
        
        if (indexDB[dbField].count() > 0) {
          indexDB[dbField].clear();
        }

        for (const item of resData) {
          await indexDB[dbField].add(item);
        }
      }
    } catch (e) {
      setError(e);
    }
  }

  async function getIdB() {
    const idbCache = await indexDB[dbField].toArray();
    if (idbCache.length > 0) {
      setData(idbCache);
    }
  }

  useEffect(() => {
    getIdB();
  }, []);

  useEffect(() => {
    if (isOnline) {
      handleFetch();
    }
  }, [isOnline]);

  return {
    data,
    error,
    reSync: handleFetch,
  };
}
