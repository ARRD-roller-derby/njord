import axios from 'axios'

export const bifrost = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    Authorization: process.env.BIFROST_TOKEN,
  },
  baseURL: process.env.NEXT_PUBLIC_BIFROST_URL,
})
