import React, { useState } from 'react'
import axios from 'axios';
import '../teamCard.css'

export default function TeamCard(props) {

    function sendRequest() {
        axios.get("http://localhost/events/" + props.event_id)
            .then(result => {

                var notification = {
                    from: localStorage.getItem("username"),
                    to: props.members[0],
                    team: props.name,
                    team_id: props.id,
                    event_id: result.data._id,
                    event_name: result.data.name,
                    msg: localStorage.getItem("username") + " requested to join " + props.name + " in " + result.data.name,
                    notif_type: "request"
                }
                axios.post("http://localhost/notifications/", notification)
                    .then(res => alert(res.data.msg))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))


    }
    return (
        // <div>
        //     <h2>{props.name}</h2>
        //     <ul>
        //         {
        //             props.members.map(member => {
        //                 return (<li key={member}>{member}</li>)
        //             })
        //         }
        //     </ul>
        //     <button onClick={sendRequest}>Request to Join</button>
        // </div>

        <div className="containerjoin">
            
                    <div className="cardjoin__content">
                        <h3 className="cardjoin__header">{props.name}</h3>
                        
                            <ul >
                                {
                                    props.members.map(member => {
                                        return (<li className="cardjoin__info" style={{ listStyleType: "none" }} key={member}>{member}</li>)
                                    })
                                }
                            </ul>
                        
                        <button className="cardjoin__button" onClick={sendRequest}>Request to Join</button>
                    </div>
         </div>

    )
}
