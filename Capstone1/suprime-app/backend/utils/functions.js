import { response } from 'express'
import mongoose from 'mongoose'
import fs from 'fs'
import  ItemSchema  from '../DAO/models/Item.js'
import inventory from '../db/inventory.json' assert {type: "json"}

let res = response


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
  let db = mongoose.connections[0]

  db.model('Item').insertMany(inventory)
}