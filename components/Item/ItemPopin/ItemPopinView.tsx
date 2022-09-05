import classes from './ItemPopin.module.css'
import ShutterModale from '../../_ui/ShutterModale/ShutterModale'
import { ItemInterface, ItemOwnerType } from '../../../types/items.interface';
import MiniForm from '../../MiniForm/MiniForm/MiniForm'
import MiniFormStringEdit from '../../MiniForm/MiniFormString/MiniFormStringEdit/MiniFormStringEdit'
import MiniFormStringRead from '../../MiniForm/MiniFormString/MiniFormStringRead/MiniFormStringRead'
import MiniFormSelect from '../../MiniForm/MiniFormSelect/MiniFormSelect'
import { UserInterface } from '../../../types/User.interface'
import ItemDeleteButton from '../ItemDeleteButton/ItemDeleteButton';
import ItemRenderType from '../ItemRenderType/ItemRenderType';
import ItemRecoveryButton from '../ItemRecoveryButton/ItemRecoveryButton';
import Image from 'next/image';
import MarkSvg from '../../../public/icons/marker.svg'
import ItemDepositButton from '../ItemDepositButton/ItemDepositButton';

interface props {
  readonly item: ItemInterface
  readonly reSync: Function
  readonly setClose: Function
  readonly user: UserInterface
  readonly uri: string
  readonly isMyItem:boolean
}

export default function ItemPopinView({
  item,
  setClose,
  user,
  uri,
  reSync,
  isMyItem
}: props) {
  return (
    <ShutterModale setClose={setClose} show={!!item}>
      {item && (
        <div className={classes.container}>
          <h1 className={classes.title}>
            <div>Objet</div>
          </h1>
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
                  label: "moi",
                  value: ItemOwnerType.user
                },
                {
                  label: "league",
                  value: ItemOwnerType.league
                }
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
          <ItemRecoveryButton item={item} reSync={reSync} setClose={setClose}/>
          <ItemDepositButton item={item} reSync={reSync} setClose={setClose}/>
          {isMyItem && <ItemDeleteButton item={item} reSync={reSync} setClose={setClose}/>}
        </div>
      )}
    </ShutterModale>
  )
}
