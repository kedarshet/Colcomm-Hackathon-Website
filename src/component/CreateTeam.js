import axios from 'axios';
import React,{useState,useEffect} from 'react'
import '../regStyle.css';

export default function CreateTeam(props) {
    
    const [team, setTeam] = useState({
        name: '',
        event_id: props.match.params.event_id,
        members:[localStorage.getItem("username")]
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setTeam(prevValue => {
            return {
                ...prevValue,
                [name]: value

            }
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost/events/createTeam',team)
        .then(result => {
            alert(result.data.msg)
        })
        .catch((err) => console.log("Error :" + err))

    }

    return (
               
        <div className="bng1">
        <div className="login-root">
        <div className="box-root flex-flex flex-direction--column" style={{minHeight: "100vh" },{flexGrow: "1"}}>
           <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{flexGrow: "1"},{ zIndex: "9"}}>
            <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
              <h1>Create Team</h1>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  <span className="padding-bottom--15">Enter your Team Name</span>
                  <form onSubmit={handleSubmit} id="stripe-login">
                    <div className="field padding-bottom--24">
                    <input type="text" onChange={handleChange} name="name" value={team.name} placeholder="Team Name" />
                    </div>
                    <div className="field padding-bottom--24">
                    <input type="submit" value="Create" />
                    </div>
                    
                  </form>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}

