const mongoose=require('mongoose')

const parkingSchema=mongoose.Schema({
    vno:String,
    vtype:String,
    vintime:Date,
    vouttime:Date,
    vamount:Number,
    status:{type:String,default:'In'}
})
module.exports=mongoose.model('parking', parkingSchema)