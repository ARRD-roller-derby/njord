/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Error from '../../types/error.interface';

interface Fetch {
  readonly loading: boolean;
  readonly error: Error;
  readonly data: any;
  readonly refetch: Function
}

//TODO rename useFetchWithToast
export default function useFetch<Props>(url:string, body:object={}):Fetch {
  const [data, setData] = useState<any>(),
    [error, setError] = useState<Error>(),
    [loading, setLoading] = useState<boolean>(false);

  async function handleFetch(newBody?: object) {
    setLoading(true);
    try {
      const { data: resData } = await toast.promise(
        axios.post(
          '/api/' + url,
          newBody || body
        ),
        {
          pending: 'chargement',
          success: 'OK 👌',
          error: 'Un problème est survenue !'
        },
        {toastId: url}
      )
      setData(resData);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    handleFetch();
  }, []);
  return {
    refetch: handleFetch,
    data,
    error,
    loading,
  };
}
