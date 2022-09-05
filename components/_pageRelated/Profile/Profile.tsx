import ProfileView from './ProfileView';
import useProfile from './useProfile';

export default function Profile(){
  const props = useProfile();
  
  return <ProfileView {...props}/>
}