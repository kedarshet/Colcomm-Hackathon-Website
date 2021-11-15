import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import '../button_style.css'
import '../style.css'


function EventComponent(props){
    return (
        
            

             <div className="main-container">
  
                <div className="card-container">
                <div className="card card-1">
                <h2>{props.name}</h2>
                <h4 className="card__title">{props.description}</h4>
                <Link to={'/events/'+props.id} ><span></span></Link> 
                
                
                </div>

                
            </div>
            </div> 
            
 
        

    )
}

export default EventComponent;