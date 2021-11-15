const router = require("express").Router();
const User=require('../models/signup.model')

router.get('/:id',(req,res)=>{

    User.findOne({_id:req.params.id})
    .then(result => res.json(result.username))
    .catch(err => res.json(err))

})

router.get('/getuser/:username',(req,res)=>{

    User.findOne({username:req.params.username})
    .then(result => res.json(result))
    .catch(err => res.json(err))

})

router.get('/info/:id',(req,res)=>{

    User.findOne({_id:req.params.id})
    .then(result => res.json(result))
    .catch(err => res.json(err))

})




module.exports=router;