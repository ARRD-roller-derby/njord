import { MongoClient } from 'mongodb'
import { it, expect } from 'vitest'
import { createMocks } from 'node-mocks-http'
import handleItems from '../pages/api/items/items'
import { MongoDb } from '../db/mongo.connect'
import Item from '../models/item.model'

describe('HELLO', () => {

  beforeAll(async () => {
    await MongoDb()
    await Item.create({
      name: 'test',
      ownerType: 'user',
      ownerId: 'id',
      localization: {
        type: 'user',
        id: 'id',
        name: 'user mock',
      },
    })
  })

  afterAll(async ()=>{
    await MongoDb()
    await Item.deleteMany()
  })
  
  it('inserts and reads a document', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await handleItems(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData()).length).toEqual(1)
  })
})
