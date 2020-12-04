const express = require('express')
const router = express.Router()
const Endpont = require('../../models/endpoints') 
require('dotenv').config()

router.post('/', async (req, res) => {
    // Construct req.body from the following 
    // email from auth.email, endpoint from register api call, shortName form
    console.log("endpoint api:  "+JSON.stringify(req.body))
    const { email, endpoint, shortName } = req.body
    if (!shortName) {
        return res.status(400).json({ msg: 'Please enter short name' })
    }
    try {
        const newEndpoint = new Endpont({
            email: email,
            shortName: shortName,
            endpoint: endpoint
        })
        console.log(newEndpoint)
        const savedEndpoint = await newEndpoint.save()
        if (!savedEndpoint) throw Error('Something went wrong saving the endpoint')
        res.status(200).json({ success: true })
        }
        catch (e) {
            res.status(400).json({ error: e.message })
      }
})
    

router.delete('/:shortname', (req, res) => {
    Endpont.findById(req.params.shortname).then( endpoint =>
        endpoint.remove().then(()=> res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }))
})
module.exports = router