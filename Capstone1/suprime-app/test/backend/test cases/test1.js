import { authEndpoints } from '../utils/variables.js'

export const apiAuthTests = (agent) => {
  let body
  let success

  test(`POST ${authEndpoints[2]}, should return new refreshToken for logged in user`, async () => {
    await agent
      .post(`${authEndpoints[2]}`)
      .expect(200)
      .then((res, err) => {
        if (err) console.error(err)
        body = res.body
        success = body.success

        expect(success).toEqual(true)
        expect(res.header['set-cookie']).toBeDefined()
      })
  })

  test(`GET ${authEndpoints[3]}, should clear user refreshToken on user logout`, async () => {
    const _expected = [
      'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    ]
    await agent
      .get(`${authEndpoints[3]}`)
      .expect(200)
      .then((res, err) => {
        if (err) console.error(err)
        const cookies = res.headers['set-cookie']
        body = res.body

        expect(body.success).toBe(true)
        expect(cookies).toEqual(_expected)
      })
  })

  test(`GET ${authEndpoints[4]}, should return logged in user details`, async () => {
    await agent.get(`${authEndpoints[4]}`).then((res, err) => {
      if (err) console.log(err)
      body = res.body
      expect(typeof body.userDetails).toBe('object')
      expect(body.message).toBeDefined()
    })
  })

  test(`GET /api/v1/users, should allow access to admin users and return list of users`, async () => {
    await agent.get(`${authEndpoints[5]}`).then((res, err) => {
      if (err) console.log(err)
      body = res.body
      expect(body).toHaveProperty('users')
      expect(typeof body.users).toBe('object')
      expect(body.total_users).toEqual(2)
    })
  })

  test('GET /api/v1/users, should return list of all users with a "user" role', async () => {
    await agent
      .get(`${authEndpoints[5]}`)
      .query({ role: 'user' })
      .then((res, err) => {
        if (err) console.log(err)
        body = res.body
        expect(body).toHaveProperty('users')
        expect(typeof body.users).toBe('object')
        expect(body.total_users).toEqual(1)
      })
  })

  test('GET /api/v1/users, should return list of all users with a "admin" role', async () => {
    await agent
      .get(`${authEndpoints[5]}`)
      .query({ role: 'admin' })
      .then((res, err) => {
        if (err) console.log(err)
        body = res.body
        expect(body).toHaveProperty('users')
        expect(typeof body.users).toBe('object')
        expect(body.total_users).toEqual(1)
      })
  })

  test('GET /api/v1/users, should return list of all users with a "employee" role', async () => {
    await agent
      .get(`${authEndpoints[5]}`)
      .query({ role: 'employee' })
      .then((res, err) => {
        if (err) console.log(err)
        body = res.body
        expect(body).toHaveProperty('users')
        expect(typeof body.users).toBe('object')
        expect(body.total_users).toEqual(0)
      })
  })
}
