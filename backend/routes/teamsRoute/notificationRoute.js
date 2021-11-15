const router = require("express").Router();
const Notification = require("../../models/notifications.model")

router.post('/',(req,res)=>{
    const notification = new Notification({
        from:req.body.from,
        to:req.body.to,
        team:req.body.team,
        team_id:req.body.team_id,
        event_id:req.body.event_id,
        event_name:req.body.event_name,
        msg:req.body.msg,
        notif_type:req.body.notif_type
    })

    notification.save((err,notification)=>{
        if(err) res.status(200).json({"msg":"Request Failed"});
        else{
            console.log(notification);
            res.status(200).json({"msg":"Request sent"})
        }
    })
})


router.get("/:username",(req,res)=>{
    Notification.find({to:req.params.username})
    .then(notifs => res.status(200).json(notifs))
    .catch(err => console.log(err))
})

module.exports=router;