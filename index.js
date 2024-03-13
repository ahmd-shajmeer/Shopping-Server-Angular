require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./Connection/db')
const router = require('./Routes/routes')

const cartServer = express()

cartServer.use(cors())
cartServer.use(express.json())
cartServer.use(router)

const PORT = 3000 || process.env.PORT

cartServer.listen(PORT,() =>{
    console.log("Shopping Cart Server is Online");
})

cartServer.get('/',(req,res) =>{
    res.send('<h1>Shopping Cart Server is created... Waiting for client request</h1>')
})
