import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { bano } from '../../../datasources/bano'
import validator from 'validator';

interface result {
  address:string;
  zipcode: string,
  lat: number,
  lon: number,
  city: string,
  importance:number
}

export default async function searchAddress(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')

  if(!req.body.search)return res.status(400).send('aucun critère de recherche')
  
  const {data} = await bano.get(validator.escape(req.body.search))

  if(!data && data?.features) return res.json(data)

  res.json(data.features.map(({properties,geometry}):result => ({
      address: properties.name,
      zipcode: properties.postcode,
      lat: geometry?.coordinates.at(),
      lon: geometry?.coordinates.at(-1),
      city: properties.city,
      importance: properties.importance
    })).sort((a:result,b:result)=> b.importance - a.importance))
}