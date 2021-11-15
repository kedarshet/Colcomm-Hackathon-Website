import React from 'react'
import '../teamCard.css'

export default function DisplayTeam(props) {
    return (
        // <div id="team-container">
        //     <h2>{props.name}</h2>
        //     <div>
                
        //         {
        //             props.members.map(member =>{
        //                 return <div>{member}</div>
        //             })
        //         }
        //     </div>
            
        // </div>

          <div className="containerjoin">
            
            <div className="cardjoin__content" style={{display:'block'}}>
                <h2 className="cardjoin__header" style={{textAlign:"center"}}>{props.name}</h2>
                    <ul >
                        {
                            props.members.map(member => {
                                return (<li className="cardjoin__info" style={{ listStyleType: "none" }} key={member}>{member}</li>)
                            })
                        }
                    </ul>
                
            </div>
 </div>

        
    )
}

