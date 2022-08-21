import { UserInterface } from '../../../types/User.interface'
import UserCardView from './UserCardView';
import useUserCard from './useUserCard';

interface props {
  readonly user: UserInterface
  readonly openPopin: Function
  readonly url: string
}

export default function UserCard({ user, openPopin, url }: props) {
  const handleClick = useUserCard(user,openPopin, url);
  
  return <UserCardView user={user} handleClick={handleClick}/>
}
