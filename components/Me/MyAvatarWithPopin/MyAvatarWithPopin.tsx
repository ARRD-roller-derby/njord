import MyAvatarWithPopinView from './MyAvatarWithPopinView'
import useMyAvatarWithPopin from './useMyAvatarWithPopin'

export default function MyAvatarWithPopin({ onClose }: { onClose?: Function }) {
  const props = useMyAvatarWithPopin(onClose)

  return <MyAvatarWithPopinView {...props}/>
}
