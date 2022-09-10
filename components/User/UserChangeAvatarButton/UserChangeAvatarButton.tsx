import UserChangeAvatarButtonView from './UserChangeAvatarButtonView';
import useUserChangeAvatarButton from './useUserChangeAvatarButton';

interface Props {
  readonly reSync:Function 
}
export default function UserChangeAvatarButton(props:Props){
  const useProps = useUserChangeAvatarButton()

  return <UserChangeAvatarButtonView {...props} {...useProps} />
}