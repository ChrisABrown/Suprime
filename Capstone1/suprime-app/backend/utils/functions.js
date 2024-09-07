import { response } from 'express'
import mongoose from 'mongoose'
import '../db/inventory.json' 



let inventory = '../db/inventory.json'

let res = response

const uri = process.env.SUPRIME_DB_URI


export const checkUser = (user) => {
  let response = {
    success: true,
    user: user,
  }

  if (user === undefined || res.statusCode === 401) {
    response.message = 'Must be logged in to continue'
    response.success = false
  }
  return Promise.resolve(response)
}


export const fillInventory = () => {
  db = mongoose.connection(uri)
  mongoose.model('Item', ItemSchema)
  db.model('Item').insertMany(inventory)
}