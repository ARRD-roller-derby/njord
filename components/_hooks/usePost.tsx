import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Error from '../../types/error.interface';

interface Fetch {
  readonly loading: boolean;
  readonly error: Error;
  readonly data: any;
  readonly post: Function
}

export default function usePost(url:string):Fetch {
  const [data, setData] = useState<any>(),
    [error, setError] = useState<Error>(),
    [loading, setLoading] = useState<boolean>(false);

  async function post(body:Object) {
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
    post,
    data,
    error,
    loading,
  };
}
