import axios from 'axios'

export const rna = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
  },
  baseURL: 'https://entreprise.data.gouv.fr/api/rna/v1/full_text/',
})
