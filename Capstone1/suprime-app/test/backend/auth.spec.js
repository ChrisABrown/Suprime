import request from 'supertest'
import app from '../../backend/index.js'
import { closeDB, init } from './utils/setup.js'
import { apiAuthTests } from './test cases/test1.js'

describe('API Response Tests', () => {
  beforeAll(async () => {
    init()
  })

  afterAll(async () => {
    closeDB()
  })

  //Auth API Tests meant to run one after another to test signup, login, and token verification processes
  describe('Auth API Tests', apiAuthTests)
  // describe('Unauthorized Auth API Tests')

  describe('Item API tests', () => {
    test('GET /api/v1/items', async () => {
      await request(app)
        .get('/api/v1/items')
        .then((response) => {
          expect(response.statusCode).toBe(200)
        })
    })
  })
})
