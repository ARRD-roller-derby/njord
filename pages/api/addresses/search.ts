import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { bano } from '../../../datasources/bano'
import validator from 'validator';
import Address from '../../../models/adresses.model';

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

  console.log(req.body)
  if(!req.body.search && !req.body.withSaveAddresses)return res.status(400).send('aucun critère de recherche')

  if(!req.body.search && req.body.withSaveAddresses){
    return res.json(await Address.find({
      ownerId: session.user._id,
      $limit: 8
    }));
  }

  const search = req.body.search
  const response = [];
  if(req.body.withSaveAddresses){
    const myAdresses = await Address.find({
      ownerId: session.user._id,
      $text:{
        $search:search
      }
    }).limit(3)
    response.push(...myAdresses);
  }

  try {
    await bano.get('',{params:{
      q:search
    }})
  }catch(e){
    console.log('e',e)
  }

  const {data} = await bano.get('',{params:{
    q:search
  }})

  if(!data && data?.features) return res.json(data)

  const banoAddresses = data.features.map(({properties,geometry}):result => ({
    address: properties.name,
    zipcode: properties.postcode,
    lat: geometry?.coordinates.at(),
    lon: geometry?.coordinates.at(-1),
    city: properties.city,
    importance: properties.importance
  })).sort((a:result,b:result)=> b.importance - a.importance)

  response.push(...banoAddresses);

  res.json(response);
}