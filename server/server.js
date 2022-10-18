const express = require("express")
const bodyParser = require("body-parser")
const transferRoute = require('./routes/transfer.route')

const server = express()

server.use(require("cors")());

server.use(bodyParser.json())

server.use(bodyParser.urlencoded({ extended: true }));

server.use('/transfer', transferRoute)

const app = server.listen(3000, ()=>{
  console.log('Server is listening on port ' + app.address().port);
})
