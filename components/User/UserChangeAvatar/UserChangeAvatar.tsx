import UserChangeAvatarView from "./UserChangeAvatarView";
import useUserChangeAvatar from './useUserChangeAvatar';

interface Props {
  readonly close:Function 
  readonly preview: string
  readonly reSync: Function 
}

export default function UserChangeAvatar(props:Props){
  const useProps = useUserChangeAvatar(props)

  return <UserChangeAvatarView {...props} {...useProps} />
}