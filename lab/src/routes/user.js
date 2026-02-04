const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

/**
 * @typedef User
 * @property {string} username.required - The user unique username
 * @property {string} firstname - The user firstname
 * @property {string} lastname - The user lastname
 */

/**
 * @route POST /user
 * @group User - Operations about user
 * @param {User.model} user.body.required - the user info
 * @returns {object} 201 - User created successfully
 * @returns {Error}  400 - Wrong parameters
 */
userRouter.post('/', (req, resp) => {
  userController.create(req.body, (err, res) => {
    let respObj
    if(err) {
      respObj = {
        status: "error",
        msg: err.message
      }
      return resp.status(400).json(respObj)
    }
    respObj = {
      status: "success",
      msg: res
    }
    resp.status(201).json(respObj)
  })
})

/**
 * @route GET /user/{username}
 * @group User - Operations about user
 * @param {string} username.path.required 
 * @returns {User.model} 
 * @returns {Error}  
 * @returns {Error}  
 */
userRouter.get('/:username', (req, resp) => {
  const username = req.params.username
  userController.get(username, (err, user) => {
    if (err) return resp.status(500).send(err)
    if (!user) return resp.status(404).send("User not found")
    resp.status(200).json(user)
  })
})

module.exports = userRouter