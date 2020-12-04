const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const User = require('../../models/user')

router.get('/', async (req, res) => {
  try {
    const users = await User.find() 
    if (!users) throw Error('No users exist')
    res.json(users)
  }
  catch (e) {
    res.status(400).json({msg: e.message})
  }
})

router.post('/register', async (req, res) => {
    
    const { name, email, password } = req.body
    console.log(JWT_SECRET)
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
      }
    try {
        const user = await User.findOne({ email })
        if (user) throw Error('User already exists')
        
        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error('Something went wrong with bcrypt')
        const hash = await bcrypt.hash(password, salt);
         if (!hash) throw Error('Something went wrong hashing the password')
        const NewUser = new User({
            name,
            password: hash,
            email
        })
        const savedUser = await NewUser.save()
        if (!savedUser) throw Error('Something went wrong saving the user')
    
        const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
          expiresIn: 3600
        });
    
        res.status(200).json({
          token,
          user: {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email
          }
        });
      } catch (e) {
        res.status(400).json({ error: e.message })
      }
})

router.delete('/:id', (req, res) => {
    User.findById(req.params.id).then(user =>
        user.remove().then(()=> res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }))
    })
    

module.exports = router

