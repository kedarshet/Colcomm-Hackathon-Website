import React,{useState,useEffect} from 'react'
import NotifContainer from './NotifContainer'
import axios from 'axios'

export default function Notifications() {

    const [notifications,setNotifications] = useState([]);

    useEffect(() => {
        axios.get("http://localhost/notifications/"+localStorage.getItem("username"))
            .then(result => {
                setNotifications(result.data);
                console.log(result.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            {
                notifications.map(notification =>{
                    return <NotifContainer key={notification._id} id={notification._id} from={notification.from} to={notification.to}  event_id={notification.event_id} event_name={notification.event_name} msg={notification.msg} notif_type={notification.notif_type} team={notification.team} team_id={notification.team_id}/>
                })
            }
        </div>
    )
}
