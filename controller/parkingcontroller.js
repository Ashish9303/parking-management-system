const Parking=require('../models/parking')



exports.parking=async(req,res)=>{
    const loginname=req.session.login
    const record=await Parking.find()
    res.render('parkingpage.ejs',{loginname,record})
}

exports.logout=(req,res)=>{
    req.session.destroy()
    res.redirect('/')
}

exports.entryform=(req,res)=>{
    const loginname=req.session.login
    res.render('entryform.ejs',{loginname,message:''})
}
exports.entryadd=(req,res)=>{
    const loginname=req.session.login
    const{vno, vtype}=req.body
    const vintime=new Date()
    const record=new Parking({vno:vno,vtype:vtype,vintime:vintime})
    record.save()
    // console.log(record)
    
    res.render('entryform.ejs',{loginname,message:'Successfully Added'})
}


exports.parkingupdat=async(req,res)=>{
   const id=req.params.id
   const vouttime=new Date()
   const record=await Parking.findById(id)
   const totaltime=(vouttime-record.vintime)/(1000*60*60)
//    console.log(totaltime)
    let amount=0
    if(record.vtype=='2w'){
        amount=Math.round(totaltime*30)
    }else if(record.vtype=='3w'){
        amount=Math.round(totaltime*40)
    }else if(record.vtype=='4w'){
        amount=Math.round(totaltime*50)
    }
    else if(record.vtype=='lw'){
        amount=Math.round(totaltime*60)
    }else if(record.vtype=='hw'){
        amount=Math.round(totaltime*100)
    }

    await Parking.findByIdAndUpdate(id,{vouttime:new Date, vamount:amount,status:'OUT'})
    res.redirect('/parking')
}

exports.parkingprint=async(req,res)=>{
const id=req.params.id
const record=await Parking.findById(id)
res.render('print.ejs',{record})
}
