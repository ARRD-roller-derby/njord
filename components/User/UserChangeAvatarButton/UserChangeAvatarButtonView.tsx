import classes from './UserChangeAvatarButton.module.css'
import MyAvatar from '../../_ui/MyAvatar/MyAvatar'
import { UserInterface } from '../../../types/User.interface'
import dynamic from 'next/dynamic'
import { AvailableFeatureInterface } from '../../../types/feature.interface'

interface Props {
  readonly sendedImg: string
  readonly close: Function
  readonly submitFile: Function
  readonly reSync: Function
  readonly avatarFeat: AvailableFeatureInterface
}

const UserChangeAvatar = dynamic(
  () => import('../UserChangeAvatar/UserChangeAvatar'),
  { ssr: false }
)

export default function UserChangeAvatarButtonView({
  sendedImg,
  close,
  submitFile,
  reSync,
  avatarFeat,
}: Props) {
  return (
    <div className={classes.container}>
      {sendedImg && (
        <UserChangeAvatar
          close={() => close()}
          preview={sendedImg}
          reSync={reSync}
        />
      )}
      <div className={classes.avatar}>
        <MyAvatar size={60} />
      </div>

      <label className="button" htmlFor="avatar_change">
        Modifier ({avatarFeat.cost} Dr.)
      </label>
      {!sendedImg && (
        <input
          type="file"
          className={classes.input}
          onChange={(e) => submitFile(e)}
          id="avatar_change"
          accept="image/*"
        />
      )}
    </div>
  )
}
