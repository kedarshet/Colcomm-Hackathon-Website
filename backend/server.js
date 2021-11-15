const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require('config');

app.use(require('cors')())
app.use(express.json())

const uri = config.get("ATLAS_URI");   

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 }).then(()=>{
     console.log(`connection to database established`)
 }).catch(err=>{
     console.log(`db error ${err.message}`);
     process.exit(-1)
 })

const EventsPageRoute = require("./routes/teamsRoute/eventsRoute")
const SignupRoute=require('./routes/signupRoute')
const LoginRoute = require("./routes/loginRoute")
const UserRoute = require("./routes/userRoute")
const NotificationRoute = require("./routes/teamsRoute/NotificationRoute")


app.use("/events",EventsPageRoute)

app.use('/signup',SignupRoute)

app.use('/login',LoginRoute)

app.use('/user',UserRoute)

app.use('/notifications',NotificationRoute)



const port = process.env.PORT || 80;
app.listen(port , ()=> console.log(`Server is running on port :${port}`))

