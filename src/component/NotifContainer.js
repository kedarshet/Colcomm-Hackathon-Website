import axios from 'axios'
import React from 'react'
import '../createTeam.css'
import '../blueButton.css'

export default function NotifContainer(props) {

    function handleAccept() {
        axios.get("http://localhost/user/getuser/" + props.from)
            .then(result => {
                var index = result.data.events.indexOf(props.event_id);
                if (index !== -1) {
                    alert(props.from + " has already joined a team");
                }
                else {
                    var notification = {
                        from: localStorage.getItem("username"),
                        to: props.from,
                        team: props.team,
                        team_id: props.team_id,
                        event_id: props.event_id,
                        event_name: props.event_name,
                        msg: "Your request to join " + props.team + " in " + props.event_name + " has been accepted",
                        notif_type: "info"
                    }

                    axios.post("http://localhost/events/updateTeam", notification)
                        .then(result => alert(result.data.msg))
                        .catch(err => console.log(err))


                }
            })

    }

    function handleReject() {
        var notification = {
            from: localStorage.getItem("username"),
            to: props.from,
            team: props.team,
            event_id: props.event_id,
            event_name: props.event_name,
            msg: "Your request to join " + props.team + " in " + props.event_name + " has been rejected",
            notif_type: "info"
        }

        axios.post('http://localhost/notifications/', notification)
            .then(result => alert(result.data.msg))
            .catch(err => console.log(err))
    }

    function handleInviteAccept() {
        axios.get("http://localhost/user/getuser/" + localStorage.getItem("username"))
            .then(result => {
                var index = result.data.events.indexOf(props.event_id);
                if (index !== -1) {
                    alert("You have already joined a team");
                }
                else {
                    var notification = {
                        from: localStorage.getItem("username"),
                        to: props.from,
                        team: props.team,
                        team_id: props.team_id,
                        event_id: props.event_id,
                        event_name: props.event_name,
                        msg: localStorage.getItem("username") + "had accepted your invitation to join " + props.team + " in " + props.event_name,
                        notif_type: "info"
                    }

                    axios.post("http://localhost/events/updateTeam/invite", notification)
                        .then(result => alert(result.data.msg))
                        .catch(err => console.log(err))


                }
            })
    }

    function handleInviteReject() {
        var notification = {
            from: localStorage.getItem("username"),
            to: props.from,
            team: props.team,
            event_id: props.event_id,
            event_name: props.event_name,
            msg: localStorage.getItem("username") + " has declined your invite for " + props.team + " in " + props.event_name,
            notif_type: "info"
        }

        axios.post('http://localhost/notifications/', notification)
            .then(result => alert(result.data.msg))
            .catch(err => console.log(err))
    }

    if (props.notif_type === "request") {

        return (
            <div className="alert alert-info">
                <div className="alert-container" style={{
                    display: "flex", justifyContent: "space-between"
                }}>


                    <div>
                        <div className="alert-icon">
                            <i className="fa fa-info-circle"></i>
                        </div>
                        <b className="alert-info"><i className="material-icons md-36">notifications</i></b> <div style={{marginBottom:"5px !important",display:"inline-block"}}>{props.msg}</div></div>
                    <div >
                        <button style={{
                            margin: "0px 20px"
                        }} class="btnnot" onClick={handleAccept}><i className="material-icons md-36">done</i></button>
                        <button class="btnnot" onClick={handleReject}><i className="material-icons md-36">close</i></button>
                    </div>
                </div>


            </div>
        )
    }
    else if (props.notif_type === "info") {
        return (
            <div className="alert alert-info">
            <div className="alert-container" style={{
              display:"flex",justifyContent:"space-between"
            }}>
              
              
              <div>
              <div className="alert-icon">
                <i className="fa fa-info-circle"></i>
              </div>
                <div>
                    <b className="alert-info"><i className="material-icons md-36">notifications</i></b> {props.msg}
              
                </div>
                </div>
              </div>
          
             
      </div>
        )
    }
    else if (props.notif_type === "invite") {
        return (
            // <div>
            //     <span>{props.msg}</span>
            //     <button onClick={handleInviteAccept}>Accept</button>
            //     <button onClick={handleInviteReject}>Reject</button>
            // </div>

            <div className="alert alert-info">
                <div className="alert-container" style={{
                    display: "flex", justifyContent: "space-between"
                }}>


                    <div>
                        <div className="alert-icon">
                            <i className="fa fa-info-circle"></i>
                        </div>
                        <b className="alert-info"><i className="material-icons md-36">notifications</i></b> <div style={{marginBottom:"5px !important",display:"inline-block"}}>{props.msg}</div></div>
                    <div >
                        <button style={{
                            margin: "0px 20px"
                        }} class="btnnot" onClick={handleInviteAccept}><i className="material-icons md-36">done</i></button>
                        <button class="btnnot" onClick={handleInviteReject}><i className="material-icons md-36">close</i></button>
                    </div>
                </div>


            </div>
        )
    }

}
