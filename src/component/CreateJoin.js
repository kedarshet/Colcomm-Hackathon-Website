import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import Events from './Events';
import DisplayTeam from './DisplayTeam';
import '../createTeam.css'

export default function CreateJoin(props) {

    const [team,setTeam] = useState();
    const [status,setStatus] = useState(0);
    const [user,setUser] = useState('');
    const [eventObj,setEventObj] = useState();
    
    useEffect( () => {

        let event_id = props.match.params.event_id;

        axios.get("http://localhost/events/"+event_id)
        .then(result=>setEventObj(result.data))
        .catch(err => console.log(err))

        axios.get("http://localhost/user/info/"+localStorage.getItem("user_id"))
            .then(user => {
               
                if(user.data.events && (user.data.events.indexOf(event_id))!==-1) {
                    // console.log("Hello")
                    let team_id = user.data.teams[user.data.events.indexOf(event_id)];
                    console.log(team_id)
                    axios.get("http://localhost/events/team/"+team_id)
                    .then(result => {
                        console.log(result.data);
                        setTeam(result.data);
                        
                        setStatus(1);
                    })
                    .catch(err => console.log(err))
                   
                 
                }
                
                
            })
            .catch(err => console.log(err))
    }, [])

    if(!status){

        return (
            
            <div className="content">
                
                <Link to={'/events/'+props.match.params.event_id+'/createteam'} style={{textDecoration:"none"}}>
                <div class="cardcj">
         
                <div class="icon"><i class="material-icons md-36">group_add</i></div>
                <p class="title">Create team</p>
                <p class="text">Click here to create {'\n'}a team.</p>
      
                </div>
                </Link>
                <Link to={'/events/'+props.match.params.event_id+'/jointeam'} style={{textDecoration:"none"}}>
                <div class="cardcj">
         
         <div class="icon"><i class="material-icons md-36">groups</i></div>
         <p class="title">Join team</p>
         <p class="text">Click here to join{'\n'} a team.</p>
      
        </div>
                </Link>
                {/* {
                    teams.map(team=>{
                        return(
                            <teamComponent key={team._id} id={team._id} name={team.name} members={team.members} />
                        )
                    })
                } */}
            
            </div>

        )
    }
    else{
        

        function handleChange(event) {
            const { name, value } = event.target;
            setUser(value);
        }

        function handleSubmit(event){
            event.preventDefault();
            axios.get('http://localhost/user//getuser/'+user)
            .then(result =>{
                if(result.data.events && result.data.events.indexOf(props.match.params.event_id)!==-1){
                    alert(user+" already has a team");
                }
                else{
                    var notification = {
                        from:localStorage.getItem("username"),
                        to:user,
                        team:team.name,
                        team_id:team._id,
                        event_id:props.match.params.event_id,
                        event_name:eventObj.name,
                        msg:localStorage.getItem("username")+" invited you to join "+team.name+" in "+eventObj.name,
                        notif_type:"invite"
                    }
                    axios.post("http://localhost/notifications/",notification)
                    .then(result => alert(result.data.msg))
                    .catch(err => console.log(err))
                }

            })
        }
        return (
        <div>
            <div>
                       
                 <DisplayTeam name={team.name} members={team.members} />
            </div>
            
                {/* localStorage.getItem("username") === team.members[0] ?
                (
                 <form onSubmit={handleSubmit}>
                    <h1>Invite a friend</h1>
                    <input  type="text" onChange={handleChange} name="username" value={user} placeholder="Enter username"/>
                    <input type="submit" value="Invite"/>
                </form>
                ):null */}
            {
                localStorage.getItem("username") === team.members[0] ?(
                <div className="container">

                    <br/>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8 d-flex justify-content-center">
                        {/* <DisplayTeam name={team.name} members={team.members} /> */}
                            <form className="card card-sm" style={{background:" linear-gradient(135deg, #a1c4fd , #c2e9fb)"}} onSubmit={handleSubmit}>
                                <div className="card-body row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <i className="fas fa-search h4 text-body"></i>
                                    </div>
                                    <div className="col">
                                        <input className="form-control form-control-lg form-control-borderless" type="text" onChange={handleChange} name="username" value={user} placeholder="Enter Username"/>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-lg btn-success" type="submit" value="Invite">Invite</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                ):null
            }
           
        </div>
        
        )
    }

}
