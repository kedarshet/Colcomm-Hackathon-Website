import React,{useState,useEffect} from 'react'
import axios from 'axios';
import TeamCard from './TeamCard';

export default function JoinTeam(props) {
    const [teams,setTeams] = useState([]);
    useEffect(() => {
        let event_id = props.match.params.event_id;
        axios.get("http://localhost/events/"+event_id+"/teams")
            .then(result => {
                setTeams(result.data)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
            {
                teams.map(team =>{
                    return(
                       <TeamCard key={team._id} id={team._id} name={team.name} members={team.members} event_id={team.event_id} />
                    )
                })
            }
        </div>
    )
}
