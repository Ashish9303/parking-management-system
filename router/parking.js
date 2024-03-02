const router=require('express').Router()
const parkingc=require('../controller/parkingcontroller')
const regc=require('../controller/regcontroller')

function handlelogin(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/')
    }
}

router.get('/',regc.loginpage)
router.post('/',regc.logincheck)
router.get('/signup',regc.signupform)
router.post('/signup',regc.signup)
router.get('/parking',handlelogin,parkingc.parking)
router.get('/logout',parkingc.logout)
router.get('/entry',parkingc.entryform)
router.post('/entry',parkingc.entryadd)
// router.get('/parkingupdateform/:id',parkingc.parkingupdateform)
router.get('/parkingupdaterecord/:id',parkingc.parkingupdat)
router.get('/print/:id',parkingc.parkingprint)




module.exports=router