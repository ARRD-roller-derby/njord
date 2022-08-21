import { useState } from 'react';

export default function useLeague(){
  const [canIRequest,setCanIRequest] = useState<boolean>(true);
  return {canIRequest,setCanIRequest}
}