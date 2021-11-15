const router = require("express").Router();

const Event = require("../../models/events.model")
const User = require("../../models/signup.model")
const Team = require("../../models/teams.model")
const Notification = require("../../models/notifications.model")


router.get("/",(req,res)=>{
    Event.find()
    .then(events => res.status(200).json(events))
    .catch(err => res.status(400).json("Error: "+err))
})
router.get("/:event_id",(req,res)=>{
    Event.findOne({_id:req.params.event_id})
    .then(event => res.status(200).json(event))
    .catch(err => res.status(400).json("Error: "+err))
})

router.get("/team/:team_id",(req,res)=>{
    Team.findOne({_id:req.params.team_id})
    .then(team => res.status(200).json(team))
    .catch(err => res.status(400).json("Error: "+err))

})


router.get('/:event_id/teams',(req,res)=>{
    Team.find({event_id:req.params.event_id})
    .then(teams => res.status(200).json(teams))
    .catch(err=>res.status(400).json("Error:"+err))
})


router.post('/createTeam',(req,res)=>{
    const newTeam = new Team({
        name:req.body.name,
        event_id:req.body.event_id,
        members:req.body.members,

    })

    newTeam.save((err,team)=>{
        if(err) throw err;
        else{
            User.findOne({username:team.members[0]})
            .then(result =>{
                let event_id = team.event_id
                // if(result.events)
                //     result.events[event_id] = team._id;
                // else
                //     result.events = {[event_id]:team._id};
                if(result.events){
                    result.events.push(event_id);
                    result.teams.push(team._id);
                }
                else{
                    result.events = [event_id];
                    result.teams = [team._id]
                }
                result.save((err,user)=>{
                    
                    if(err) throw err;
                    else{
                        console.log(user);
                        res.status(200).json({"msg":"Team has been created"})
                    }
                })
            })
            .catch(err => res.status(400).json({"msg":"Some problem occurred"}))
        }
    })
})

router.post("/updateTeam",(req,res)=>{
    const notification = new Notification({
        from:req.body.from,
        to:req.body.to,
        event_id:req.body.event_id,
        event_name:req.body.event_name,
        team:req.body.team,
        team_id:req.body.team_id,
        msg:req.body.msg,
        notif_type:req.body.notif_type
    })

    

    Team.findOne({_id:req.body.team_id})
    .then(result => {
        result.members.push(req.body.to);
        result.save((err,team)=>{
            if(err) res.status(200).json({msg:"Something went wrong!"});
            else{
                console.log(team);
                User.findOne({username:req.body.to})
                .then(user => {
                    if(user.events){
                        user.events.push(req.body.event_id);
                        user.teams.push(req.body.team_id);
                    }
                    else{
                        user.events = [req.body.event_id];
                        user.teams = [req.body.team_id]
                    }
                    user.save((err,user)=>{
                        if(err) res.status(200).json({msg:"Something went wrong!"});
                        else{
                            notification.save((err,notif)=>{
                                if(err) res.status(200).json({msg:"Something went wrong!"});
                                else{
                                    res.status(200).json({msg:req.body.to+" has successfully joined your team"})
                                }
                            })
                        }
                    })
                })
                .catch(err => console.log(err))
            }
        })
    })
    .catch(err => console.log(err))
})

// Accept Invite
router.post("/updateTeam/invite",(req,res)=>{
    const notification = new Notification({
        from:req.body.from,
        to:req.body.to,
        event_id:req.body.event_id,
        event_name:req.body.event_name,
        team:req.body.team,
        team_id:req.body.team_id,
        msg:req.body.msg,
        notif_type:req.body.notif_type
    })

    

    Team.findOne({_id:req.body.team_id})
    .then(result => {
        result.members.push(req.body.from);
        result.save((err,team)=>{
            if(err) res.status(200).json({msg:"Something went wrong!"});
            else{
                console.log(team);
                User.findOne({username:req.body.from})
                .then(user => {
                    if(user.events){
                        user.events.push(req.body.event_id);
                        user.teams.push(req.body.team_id);
                    }
                    else{
                        user.events = [req.body.event_id];
                        user.teams = [req.body.team_id]
                    }
                    user.save((err,user)=>{
                        if(err) res.status(200).json({msg:"Something went wrong!"});
                        else{
                            notification.save((err,notif)=>{
                                if(err) res.status(200).json({msg:"Something went wrong!"});
                                else{
                                    res.status(200).json({msg:"You have successfully joined the team "+req.body.team+" in "+req.body.event_name})
                                }
                            })
                        }
                    })
                })
                .catch(err => console.log(err))
            }
        })
    })
    .catch(err => console.log(err))
})


// router.post('/:id/create',(req,res)=>{
    
//     const newTeam = new Team({
//         members:req.body.members,
//         event:req.params.id
//     })

//     if(!req.body.students_arr){
//         return res.status(200).json({msg:"Enter all fields"})
//     }
    
//     //Checking if no 1 is already registered
//     var pass=1;
//     //var fail=0;
    

//     const checkRegister = async ()=>{
//         for(let i=0;i<req.body.members.length;i++){

//             let msg;
//             await User.findOne({username : (req.body.members)[i] })
//             .then(result=>{
//                 if(result.events.req.params.id){
//                     //console.log("inside if");
//                     msg = "Student already registered!"
//                     pass=0
//                 }
//             })
//             .catch(err => {
//                 pass=0;
//                 msg = "SRN entered doesn't exist!"
//             });
            
//             //console.log("After catch");
           
            
//             if(!pass) return res.status(200).json({msg});
    
//         }

//         //console.log("after for----------------");

        

//         if(pass){
//                 //console.log("Registering---------");
//                 newTeam.save((err,newReg)=>{
//                 if(err) throw err;
//                 else{

//                     for(let i=0;i<newReg.members.length;i++){

//                         User.findOne({mem_id : (newReg.members)[i] })
//                         .then(result=>{
//                             result.events.req.params.id = newReg.id;
//                             result.save()
//                             .then(console.log(result))
//                             .catch(err=>res.json("Error: "+err))
//                         })
//                         .catch(err => res.status(400).json("Error: "+err));
                
//                     }

//                     return res.status(200).json({
//                         msg:"Registered!"
//                     })

                
//                 }
//             })
//         }
//     }

//     checkRegister();

// })



module.exports=router;

