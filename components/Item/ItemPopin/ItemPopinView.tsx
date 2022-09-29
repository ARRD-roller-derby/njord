import classes from './ItemPopin.module.css'
import ShutterModale from '../../_ui/ShutterModale/ShutterModale'
import MiniForm from '../../MiniForm/MiniForm/MiniForm'
import MiniFormStringEdit from '../../MiniForm/MiniFormString/MiniFormStringEdit/MiniFormStringEdit'
import MiniFormStringRead from '../../MiniForm/MiniFormString/MiniFormStringRead/MiniFormStringRead'
import MiniFormSelect from '../../MiniForm/MiniFormSelect/MiniFormSelect'
import ItemDeleteButton from '../ItemDeleteButton/ItemDeleteButton'
import ItemRenderType from '../ItemRenderType/ItemRenderType'
import ItemRecoveryButton from '../ItemRecoveryButton/ItemRecoveryButton'
import Image from 'next/image'
import MarkSvg from '../../../public/icons/marker.svg'
import ItemDepositButton from '../ItemDepositButton/ItemDepositButton'
import { Props, useProps } from './ItemPopin.type'
import { ItemOwnerType } from '../../../types/items.interface'
import ItemThumbButton from '../ItemThumbButton/ItemThumbButton'

export default function ItemPopinView({
  item,
  setClose,
  user,
  uri,
  reSync,
  isMyItem,
}: Props & useProps) {
  return (
    <ShutterModale setClose={setClose} show={!!item}>
      {item && (
        <div className={classes.container}>
          <h1 className={classes.title}>
            <div>Objet</div>
          </h1>
          {item.picture_url && (
            <div className={classes.img}>
              <Image
                src={item.picture_url}
                width={200}
                height={200}
                alt={'apercu'}
              />
            </div>
          )}
          {isMyItem && <ItemThumbButton />}
          <MiniForm
            label="libellé"
            user={user}
            field="name"
            profiles
            uri={uri}
            model={item}
            reSync={reSync}
            editField={<MiniFormStringEdit />}
            readField={<MiniFormStringRead />}
          />
          <MiniForm
            label="type"
            user={user}
            model={item}
            field="ownerType"
            uri={uri}
            onlyAdmin
            profiles
            reSync={reSync}
            editField={
              <MiniFormSelect
                options={[
                  {
                    label: 'moi',
                    value: ItemOwnerType.user,
                  },
                  {
                    label: 'league',
                    value: ItemOwnerType.league,
                  },
                ]}
              />
            }
            readField={<ItemRenderType />}
          />
          <div>
            <div className={classes.localization}>
              <Image src={MarkSvg} width={15} height={15} alt="marqueur" />
              <div className="fdz">{item.localization.name}</div>
            </div>
          </div>
          <ItemRecoveryButton item={item} reSync={reSync} setClose={setClose} />
          <ItemDepositButton item={item} reSync={reSync} setClose={setClose} />
          {isMyItem && (
            <ItemDeleteButton item={item} reSync={reSync} setClose={setClose} />
          )}
        </div>
      )}
    </ShutterModale>
  )
}
