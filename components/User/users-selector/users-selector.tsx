import axios from 'axios'
import { FC } from 'react'
import AsyncSelect from 'react-select/async'
import reactSelectStyle from '../../../styles/reactSelectStyle'
import { UserInterface } from '../../../types/User.interface'
import userNameRender from '../../../utils/userNameRender'

interface UsersSelectorProps {
  readonly onSelect: (users: string[]) => void
  readonly defaultValue?: any
}

export default function useUsersSelector(onSelect: Function) {

  const options = async (search: string, callback: (users: { label: string, value: string }[]) => void) => {
    const { data } = await axios.post(`api/users/search`, { search })

    if (data) {
      const results = data.map((user: UserInterface) => ({
        label: userNameRender(user),
        value: user._id
      }))
      callback(results)
      return results
    } else {
      callback([])
      return []
    }
  }

  const onChange = (select: { label: string, value: Object }) => {

    if (Array.isArray(select)) {
      onSelect(select.map((item) => item.value))
      return
    }
    onSelect(select?.value || null);
  }

  return { options, onChange }
}

export const UsersSelector: FC<UsersSelectorProps> = ({ onSelect, defaultValue }) => {
  const
    { options, onChange } = useUsersSelector(onSelect),
    inputOptions = {
      instanceId: 'userSelector',
      isClearable: true,
      cacheOptions: true,
      styles: reactSelectStyle,
      noOptionsMessage: () => 'Aucun utilisateur trouvé',
      placeholder: 'utilisateur...',
      isMulti: true,
      onChange,
      loadingMessage: () => 'Chargement',
      loadOptions: options,
      defaultOptions: true
    }

  return <AsyncSelect {...inputOptions} menuPlacement="top" defaultValue={defaultValue} />
}
