//import env file
require('dotenv').config();
//import express
const express = require('express');

//import db connection to server file
const dbConnect = require('./config/db')

//import userRoutes
const userRoutes = require('./routes/userRoutes')

//call dbconnect 
dbConnect();



//create app
const app =  express();


//define PORT

const PORT = 5000;
//“express.json() is middleware used to parse incoming 
// JSON request  bodies to js objects so they can be accessed via req.body.”
app.use(express.json());

//add one route for testing
app.get('/',(req,res)=>{

    res.send("I cabs Guruvayur is working fine...")
});

app.use('/api/users',userRoutes);


//start server

app.listen(PORT,()=>{
    console.log("server running successfully..");
    
})