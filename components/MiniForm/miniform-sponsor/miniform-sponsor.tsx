import axios from "axios"
import { useSession } from "next-auth/react"
import { useState } from "react"
import AsyncSelect from 'react-select/async'
import { EventInterface } from "../../../types/Event.interface"
import usePost from "../../_hooks/usePost"
import reactSelectStyle from "../../../styles/reactSelectStyle"
import Factory from "../../_layouts/Factory/Factory"
import { ISponsor } from "../../../types/sponsor.interface"

// INTERFACE --------------------------------------------
export type MiniFormSponsorProps = {
  event: EventInterface
  reSync: () => void
}

export type MiniFormSponsorResult = {
  options: any
}

export const useMiniFormSponsor = ({ event, reSync }: MiniFormSponsorProps): MiniFormSponsorResult => {
  const
    { data: session } = useSession(),
    [sponsors, setSponsors] = useState<Array<{ label: string, value: any }>>(),
    { post } = usePost('/event/updateField')

  async function options(search: string, callback: Function) {
    const { data } = await axios.post(`/api/sponsors/search`, { search })

    if (data) {
      const results = data.map((sponsor: ISponsor) => ({
        label: sponsor.name,
        value: sponsor,
      }))
      callback(results)
      return results
    } else {
      callback([])
      return []
    }
  }

  function onChange(select: any) {
    setSponsors(select)
    post({ id: event._id, userId: session.user._id, field: 'sponsor', value: select.value })

  }

  return {
    options: {
      instanceId: 'ItemSelector',
      isClearable: true,
      cacheOptions: true,
      defaultOptions: true,
      defaultValue: event.sponsor ? {
        label: event.sponsor.name,
        value: event.sponsor,
      } : null,
      isMulti: false,
      value: sponsors,
      menuPlacement: 'top',
      styles: reactSelectStyle,
      noOptionsMessage: () => 'Aucun sponsor trouvé',
      placeholder: 'sponsor...',
      loadingMessage: () => 'Chargement',
      onChange,
      loadOptions: options,
    },
  }
}

// VIEW --------------------------------------------
export const MiniFormSponsorView: React.FC<MiniFormSponsorResult> = ({ options }) => <AsyncSelect {...options} />

export const MiniFormSponsor = Factory<MiniFormSponsorProps, MiniFormSponsorResult>(useMiniFormSponsor, MiniFormSponsorView)