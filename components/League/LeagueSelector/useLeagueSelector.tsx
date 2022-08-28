import { rna } from '../../../datasources/rna'

export default function useLeagueSelector(onSelect:Function) {

  async function options(input: string, callback: Function) {
    const { data } = await rna.get(`${input} roller derby`)

    if (data.association) {
      const results = data.association.map((result: any) => ({
        label: `${result.titre} (${result.titre_court})`,
        value: {
          city: result.adresse_libelle_commune,
          zipCode: result.adresse_code_postal,
          name: result.titre,
          shortName: result.titre_court,
          webSite: result.site_web,
          id_association:result.id_association
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
