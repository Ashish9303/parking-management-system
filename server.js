const express=require('express')
const app=express()
app.use(express.urlencoded({extended:false}))
const mongoose=require('mongoose')
const session=require('express-session')
require('dotenv').config()
const parkingRouter=require('./router/parking')
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)

app.use(session({
    secret:process.env.KEY,
    resave:false,
    saveUninitialized:false
}))



app.use(parkingRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT,()=>{console.log('Server Run on 5000 Port')})