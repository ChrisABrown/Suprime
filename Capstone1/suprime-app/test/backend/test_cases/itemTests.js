import { itemEndpoint } from '../utils/variables'
import { reqAddProduct, reqUpdateProduct } from '../data/item.test.data'
import { signInEmployee, signOut } from '../utils/setup'
import { getMockReq, getMockRes  } from '@jest-mock/express';





export const apiItemTests = () => {

//Mock Example
describe('Your Route Handler', () => {
  it('should return a JSON response', async () => {
    const req = getMockReq();
    const { res, next } = getMockRes();

    // Mock your route handler logic here
    const routeHandler = (req, res) => {
    res.json({ message: 'Hello World' });
    };

    routeHandler(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ message: 'Hello World' });
  });
});

  // const SKU = []
  // let items

//   beforeEach(async () => {
//     await signInEmployee(agent)
//   })

//   afterEach(async () => {
//     await signOut(agent)
//   })

//   test(`GET ${itemEndpoint}, returns all items`, async () => {
//     const { body } = await agent.get(`${itemEndpoint}`)
//     items = body.items
//     for (const item of items) {
//       SKU.push(item.SKU)
//     }

//     expect(typeof body.items).toBe('object')
//     expect(body).toHaveProperty('filters')
//     expect(body.filters).toEqual({})
//   })

//   test(`GET ${itemEndpoint}, returns item with specific SKU`, async () => {
//     const randomSKU = SKU[Math.floor(Math.random() * SKU.length)]

//     const { body } = await agent
//       .get(`${itemEndpoint}`)
//       .query({ sku: randomSKU })

//     expect(typeof body.foundItem).toBe('object')
//     expect(body).toHaveProperty('filter')
//     expect(body.filter).toEqual({ sku: `${randomSKU}` })
//   })

//   test(`POST ${itemEndpoint}, should add a new item to the database`, async () => {
//     const { body } = await agent
//       .post(`${itemEndpoint}`)
//       .send({ item: reqAddProduct })
//     let status = body.status

//     expect(status).toEqual('Success')
//     expect(typeof body.data).toBe('object')
//     expect(body.itemSKU).toEqual(body.data['SKU'])
//   })

//   test(`DELETE ${itemEndpoint}, should delete item based on SKU`, async () => {
//     const randomSKU = SKU[Math.floor(Math.random() * SKU.length)]
//     const { body } = await agent
//       .delete(`${itemEndpoint}`)
//       .query({ sku: randomSKU })

//     let status = body.status

//     expect(body.data['deletedCount']).toEqual(1)
//     expect(status).toBe('Success')
//   })

//   test(`PUT ${itemEndpoint}, should update item based on SKU`, async () => {
//     const randomSKU = SKU[Math.floor(Math.random() * SKU.length)]

//     const { body } = await agent
//       .put(`${itemEndpoint}`)
//       .query({ sku: randomSKU })
//       .send({ item: reqUpdateProduct })

//     let updatedItem = body.data
//     let status = body.status

//     expect(status).toBe('Success')
//     expect(typeof updatedItem).toBe('object')
//     expect(updatedItem.SKU).toEqual(randomSKU)
//   })
}
