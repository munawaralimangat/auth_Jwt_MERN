const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()
const cookieParser = require('cookie-parser')
const {MONGO_URI, PORT } = process.env
const authRoute = require('./routes/AuthRoute')
const app = express()

mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=> console.log('Mongodb is connected successfully'))
.catch((err)=> console.log(err))

app.use(cookieParser());

app.use(cors({
    origin:[`http://localhost:3000`],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use(express.json())

//Auth routes
app.use('/',authRoute)


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})