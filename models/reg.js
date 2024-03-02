const mongoose=require('mongoose')

const regSchema=mongoose.Schema({
    email:String,
    pass:String,
    firstName:String,
    lastName:String,
    mobile:String,
    img:String
})
module.exports=mongoose.model('reg',regSchema)