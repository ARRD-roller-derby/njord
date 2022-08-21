import axios from 'axios';
import { useState } from 'react';
import Error from '../../types/error.interface';

interface Fetch {
  readonly loading: boolean;
  readonly error: Error;
  readonly data: any;
  readonly post: Function
}

export default function useSilentPost(url:string):Fetch {
  const [data, setData] = useState<any>(),
    [error, setError] = useState<Error>(),
    [loading, setLoading] = useState<boolean>(false);

  async function post(body:Object) {
    setLoading(true);
    try {
      const { data: resData } = await axios.post('/api/' + url,body)
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
