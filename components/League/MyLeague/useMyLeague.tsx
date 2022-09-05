import useDBSync from "../../_hooks/useDBSync"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { indexDB } from "../../../db/indexDB.connect";
import { LeagueInterface } from '../../../types/League.interface';

export default function useMyLeague(){
  const 
    {data:session} = useSession(),
    { data: leagues, reSync } = useDBSync('leagues/leagues', 'leagues'),
    [league,setLeague] = useState<LeagueInterface>();

    useEffect(()=>{
      if(session)getLeague()
    },[leagues,session])

    async function getLeague(){
      if(!session.user?.league?.id)return 

      const myLeague = await indexDB.leagues.where({_id: session.user.league.id}).first();
      setLeague(myLeague);
    }

  return {reSync,league, noLeague:!session.user?.league?.id  }
}