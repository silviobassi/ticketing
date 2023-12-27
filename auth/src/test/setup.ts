import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'

declare global {
  let getCookie: () => Promise<string[]>
}

getCookie = async () => {
  const email = 'test@test.com'
  const password = 'password'

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201)

  const cookie = response.get('Set-Cookie')

  return cookie
}
;(async () => {
  process.env.JWT_KEY = 'asdf'

  let mongodb: MongoMemoryServer

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create()
    const uri = mongodb.getUri()
    await mongoose.connect(uri)
  })

  beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (const collection of collections) {
      await collection.deleteMany({})
    }
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongodb.stop()
  })
})()
