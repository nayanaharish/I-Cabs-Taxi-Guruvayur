
//import express
const express = require('express');



//create app
const app =  express();


//define PORT

const PORT = 5000;


//add one route for testing
app.get('/',(req,res)=>{

    res.send("I cabs Guruvayur is working fine...")
});


//start server

app.listen(PORT,()=>{
    console.log("server running successfully..");
    
})