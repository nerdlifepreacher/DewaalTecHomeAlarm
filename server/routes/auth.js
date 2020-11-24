const express = require('express')
const { applyAuthRoutes } = require('authenticare/server')

const {
  userExists,
  getUserByName,
  createUser } = require('../db/users')

const router = express.Router()

applyAuthRoutes(router, {
  userExists,
  createUser,
  getUserByName
})

module.exports = router