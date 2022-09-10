import MyAvatarView from './MyAvatarView'
import useMyAvatar from './useMyAvatar'

interface Props {
  readonly size?: number
}

export default function MyAvatar(props: Props) {
  const useProps = useMyAvatar()

  return <MyAvatarView {...props} {...useProps} />
}
