//const { response } = require('express');
const { request, response } = require('express');
const express = require('express'); //importerade express

const app = express(); // anropa express metoden. 

// servera data från min app 

app.get("/", (request , response)=>{
    response.send("hello from node js")
})

app.get("/home", (request, response)=> {
   response.send(" Hello from home router")
})
// lyssna på nån port 


app.listen(8000, ()=>{
 console.log("appen körs i localhost:8000")
})
//13.00-16.30 
