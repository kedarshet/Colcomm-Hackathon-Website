import React, { useState, useEffect } from 'react'
import axios from 'axios'
import uuid from 'react-uuid';

function Profile() {

    const [username, setUsername] = useState("");


    return (
        <div>
            {/* <div className="col-lg-4 col-sm-6 mx-auto ">
                <div className="team-style-eleven text-center mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0s">
                    <div className="team-image">
                        <img  style={{borderRadius:"20px"}} src="https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg" alt="Team" />
                    </div>
                    <div className="team-content">
                        <div className="team-social">
                            <ul className="social">
                                <li><a href="#"><i className="lni lni-facebook-filled"></i></a></li>
                                <li><a href="#"><i className="lni lni-twitter-original"></i></a></li>
                                <li><a href="#"><i className="lni lni-linkedin-original"></i></a></li>
                                <li><a href="https://www.instagram.com/_suhas__rk/"><i className="lni lni-instagram"></i></a></li>
                            </ul>
                        </div>
                        <h4 className="team-name"><a href="#">{username}</a></h4>
                        <span className="sub-title">Co-Founder</span>
                    </div>
                </div>
            </div>
            <div>
            <h1 class="my-5" style={{color: "#111", fontFamily: 'Montserrat',fontSize: "50px", fontWeight: "bold", letterSpacing: "-1px", lineHeight: "1", textAlign: "center"}}>Your Questions</h1>
            </div>
            {questions.map(question => {
                return <QuestionContainer key={uuid()} created={question.createdAt} username={question.username} id={question._id} title={question.title} description={question.description} />
            })} */}
        </div>
    )




}

export default Profile;