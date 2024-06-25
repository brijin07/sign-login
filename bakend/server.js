
require('dotenv').config()

const express=require('express')

const cors=require('cors')

require('./db/dbconnection')


const server=express()


const router=require('./routes/router')


server.use(cors())

// parse json data using  server app
server.use(express.json())

server.use(router)


const PORT=4000||process.env.PORT

// to run server using listen method 

server.listen(PORT,()=>{
    console.log(` server started at port:${PORT}`);
})

