const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

router.post('/', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }
    try {
        const user = await User.findOne({ email })
        if (!user)  {
            return res.status(400).json({ msg: 'Invalid credentials' })
          }
      
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })
                
                const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
                if (!token) throw Error('Couldnt sign the token')
                res.status(200).json({
                    token,
                    user: {
                      id: user._id,
                      name: user.name,
                      email: user.email
                    }
                  })
            })
    }
    catch (e) {
        res.status(400).json({ error: e.message });
      }
})

module.exports = router
