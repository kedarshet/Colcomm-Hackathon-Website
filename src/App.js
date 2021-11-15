import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Navbar from './component/Navbar';
import Signup from './component/Signup'
import Login from './component/Login'
import Logout from './component/Logout'
import Profile from './component/Profile'
import Events from './component/Events'
import CreateJoin from './component/CreateJoin'
import CreateTeam from './component/CreateTeam'
import JoinTeam from './component/JoinTeam'
import Notifications from './component/Notifications';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

require('popper.js');

function App(){
    return(
        <div>
        
        <Router>
            <Navbar />
            <Route exact path='/' component={Events} />
            <Route exact path='/signup'  component={Signup} />
            <Route exact path='/login'  component={Login} />
            <Route exact path='/logout'  component={Logout} />
            <Route exact path='/profile'  component={Profile} />
            <Route exact path='/events/:event_id' component={CreateJoin} />
            <Route exact path='/events/:event_id/createTeam' component={CreateTeam} />
            <Route exact path='/events/:event_id/joinTeam' component={JoinTeam} />
            <Route exact path='/notifications' component={Notifications} />

        </Router>
        </div>
    )
}

export default App;