import { rna } from '../../../datasources/rna'

export default function useLeagueSelector(onSelect:Function) {

  async function options(input: string, callback: Function) {
    const { data } = await rna.get(`${input} roller derby`)

    if (data.association) {
      const results = data.association.map((o: any) => ({
        label: `${o.titre} (${o.titre_court})`,
        value: {
          city: o.adresse_libelle_commune,
          zipCode: o.adresse_code_postal,
          name: o.titre,
          shortName: o.titre_court,
          webSite: o.site_web,
          id_association:o.id_association
        },
      }))
      callback(results)
      return results
    } else {
      callback([])
      return []
    }
  }

  function onChange(select:{label:string,value:Object}){
    onSelect(select?.value || null);
  }

  return {options,onChange}
}
