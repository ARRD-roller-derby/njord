import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Error from '../../types/error.interface';
import LoaderWheel from '../_ui/LoaderWheel/LoaderWheel';

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

  async function post(body:Object,returnMsg?:string) {
    setLoading(true);
    try {
      const { data: resData } = await toast.promise(
        axios.post(
          '/api/' + url,
          body
        ),
        {
          pending: {render:<LoaderWheel/>},
          success:{
            render({data}){
              if(returnMsg) return returnMsg
              return data.data && typeof data.data === 'string' ? data.data: 'OK ! 👌'
            }
          } ,
          error: {
            render({data}){

              return data?.response?.data || data.message
            }
          }
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
