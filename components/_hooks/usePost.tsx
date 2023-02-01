import axios from 'axios';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Error from '../../types/error.interface';
import { MiniLoaderContext } from '../mini-loader/mini-loader';
import LoaderWheel from '../_ui/LoaderWheel/LoaderWheel';

interface Fetch {
  readonly loading: boolean;
  readonly error: Error;
  readonly data: any;
  readonly post: Function
}

export default function usePost(url: string): Fetch {
  const [data, setData] = useState<any>(),
    [error, setError] = useState<Error>(),
    [loading, setLoading] = useState<boolean>(false),
    [_globalLoading, setGlobalLoading] = useContext(MiniLoaderContext)

  async function post(body: Object, returnMsg?: string) {
    setLoading(true);
    setGlobalLoading(true)
    try {
      const { data: resData } = await toast.promise(
        axios.post(
          '/api/' + url,
          body
        ),
        {
          success: {
            render({ data }) {
              if (returnMsg) return returnMsg
              return data.data && typeof data.data === 'string' ? data.data : 'OK !'
            }
          },
          error: {
            render({ data }) {
              return data?.response?.data || data.message
            }
          }
        },
        { toastId: url }
      )
      setData(resData);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
    setGlobalLoading(false)
  }

  return {
    post,
    data,
    error,
    loading,
  };
}
