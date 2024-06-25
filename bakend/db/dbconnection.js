// IMPORT MONGOOSE 
const mongoose=require('mongoose')

// IMPORT CONNECTION STRING
const connectionString=process.env.DATABASE

mongoose.connect(connectionString,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log('mongo db atlas connected to  server');
}).catch((err)=>{
 console.log('mongo db connection failed',);
})