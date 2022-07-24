/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Error from '../../types/error.interface';

interface Fetch {
  readonly loading: boolean;
  readonly error: Error;
  readonly data: any;
  readonly post: Function
}

//TODO rename useFetchWithToast
export default function usePost<Props>(url:string):Fetch {
  const [data, setData] = useState<any>(),
    [error, setError] = useState<Error>(),
    [loading, setLoading] = useState<boolean>(false);

  async function handlePost(body:Object) {
    setLoading(true);
    try {
      const { data: resData } = await toast.promise(
        axios.post(
          '/api/' + url,
          body
        ),
        {
          pending: 'En cours...',
          success: 'OK ! 👌',
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

  return {
    post: handlePost,
    data,
    error,
    loading,
  };
}
