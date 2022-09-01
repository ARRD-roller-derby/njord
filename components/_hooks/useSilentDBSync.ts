import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useIsOnline from "./online.hook";
import { indexDB } from "../../db/indexDB.connect";

export default function useSilentDBSync<T>(
  url: string,
  dbField: string,
  body: Object = {}
) {
  const isOnline = useIsOnline(),
    [data, setData] = useState<T>(),
    [loading,setLoading] = useState(false);

  async function handleFetch(newBody?: object) {
    setLoading(true);
    try {
      const { data: resData } = await axios.post("/api/" + url, newBody || body);
      if (JSON.stringify(resData) !== JSON.stringify(data) || resData.length === 0) {

        const tableAsValues = await indexDB[dbField].count();

        if (tableAsValues > 0) {
          await indexDB[dbField].clear();
        }
        
        for (const item of resData) {
          await indexDB[dbField].add(item);
        }
        setData(resData);
      }
    } catch (e) {
      toast.error(e)
    }
    setLoading(false);
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
    loading,
    reSync: handleFetch,
  };
}
