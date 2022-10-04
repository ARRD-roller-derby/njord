import axios from 'axios'

export const bano = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type, Accept'
  },
  baseURL: 'https://api-adresse.data.gouv.fr/search',
})
