const Reg=require('../models/reg')
const bcrypt=require('bcrypt')

exports.loginpage=(req,res)=>{
    res.render('loginpage.ejs', {message:''})
}

exports.logincheck=async(req,res)=>{
   const{uname,pass}=req.body
    const emailcheck=await Reg.findOne({email:uname})
    if(emailcheck!==null){
        const passwordcompared=await bcrypt.compare(pass,emailcheck.pass)
        if(passwordcompared){
            req.session.isAuth=true
            req.session.login=uname
            res.redirect('/parking')
        }else{
            res.render('loginpage.ejs',{message:'Wrong Password'})
        }
    }else{
        res.render('loginpage.ejs',{message:'Wrong Credential'})
    }
}

exports.signupform=(req,res)=>{
    res.render('signupform.ejs',{message:''})
}
exports.signup=async(req,res)=>{
    const{uname,pass}=req.body
    const emailcheck=await Reg.findOne({email:uname})
    if(emailcheck==null){
    const convertpass=await bcrypt.hash(pass,10)
    const record=new Reg({email:uname, pass:convertpass})
    record.save()
    res.render('signupform.ejs',{message:'Account Created Successfully'})
    }else{
        res.render('signupform.ejs',{message:'Email is already Registered'})
    }
}
