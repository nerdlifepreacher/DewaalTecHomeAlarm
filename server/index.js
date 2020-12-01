const server = require('./server')
const envConfig = require('dotenv').config()
if(envConfig.error) throw envConfig.error

const port = process.env.PORT || 3000

server.listen(port, function () {
   console.log('Listening on port', port)
})
