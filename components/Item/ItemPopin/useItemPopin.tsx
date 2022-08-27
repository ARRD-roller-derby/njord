import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { ItemInterface } from '../../../types/items.interface';

export default function useItemPopin(item:ItemInterface){
  const uri = 'item/update',
  {data:session} = useSession();

  //TODO function pour supp ou export du button de suppression

  return {user: session.user,uri}
}