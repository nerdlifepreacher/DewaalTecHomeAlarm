const express = require('express')
const router = express.Router()
const Endpont = require('../../models/endpoints') 
require('dotenv').config()

router.post('/', async (req, res) => {
    const { userID, endpoint, shortName } = req.body
    if (!shortName) {
        return res.status(400).json({ msg: 'Please enter short name' })
    }
    try {
        const newEndpoint = new Endpont({
            userID: userID,
            shortName: shortName,
            endpoint: endpoint
        })
        const savedEndpoint = await newEndpoint.save()
        if (!savedEndpoint) throw Error('Something went wrong saving the endpoint')
        res.status(200).json(savedEndpoint)
        }
        catch (e) {
            res.status(400).json({ error: e.message })
      }
})
router.get('/:id', async (req, res) => {
    const userID = req.params.id
    try {
        const endpoint = await Endpont.find({ "userID": userID }) 
        if (!endpoint) throw Error('No endpoints exist')
    res.status(200).json(endpoint)
  }
  catch (e) {
    res.status(400).json({msg: e.message})
  }
})

router.delete('/:id', (req, res) => {
    Endpont.findById(req.params.id).then( endpoint =>
        endpoint.remove().then(()=> res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }))
})
module.exports = router