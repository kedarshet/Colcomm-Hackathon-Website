import axios from 'axios'
import React from 'react'
import '../createTeam.css'
import '../blueButton.css'

export default function NotifContainer(props) {

    function handleAccept(){
        // var notification = {
        //     from :localStorage.getItem("username"),
        //     to:props.from,
        //     team:props.team,
        //     msg:"Your request to join "+props.team+" has been accepted",
        //     notif_type:"info"
        // }
    }

    function handleReject(){
        var notification = {
            from :localStorage.getItem("username"),
            to:props.from,
            team:props.team,
            msg:"Your request to join "+props.team+" has been rejected",
            notif_type:"info"
        }

        axios.post('http://localhost/notifications/',notification)
        .then(result => alert(result.data.msg))
        .catch(err => console.log(err))
    }
    if(props.notif_type === "request"){

        return (
         
        <div className="alert alert-info">
        <div className="alert-container" style={{
          display:"flex",justifyContent:"space-between"
        }}>
          
          
          <div>
          <div className="alert-icon">
            <i className="fa fa-info-circle"></i>
          </div>
          <b className="alert-info"><i className="material-icons md-36">notifications</i></b> {props.msg}</div>
          <div >
          <button style={{
            margin:"0px 20px"
          }} class="btnnot" onClick={handleAccept}><i className="material-icons md-36">done</i></button>
          <button class="btnnot" onClick={handleReject}><i className="material-icons md-36">close</i></button>
          </div>
          </div>
      
         
  </div>
        
        )
    }
    else if(props.notif_type === "info"){
        return(
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
}