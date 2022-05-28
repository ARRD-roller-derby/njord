import classes from './Members.module.css';
import { useSession } from 'next-auth/react';
import useFetch from '../../utils/hooks/useFetch';
import LoaderWheel from '../LoaderWheel/LoaderWheel';
import UserCard from '../UserCard/UserCard';
import { User } from '../../types/User.interface';

export default function Members(){
  const {data,loading}= useFetch('/getUsers')

  console.log(data)

  return <div className={classes.container}>
    {loading && <LoaderWheel/>}
    {data && <div className={classes.users}>
      {data?.users.map((user: User)=> <UserCard key={user.id} user={user} />)}
      </div>
    
    }
  </div>
}