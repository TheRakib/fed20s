
// node js own modules // dont have to npm install fs
// import with require

const fs = require("fs");

const http = require("http")
            

              //Red flagga Don't:: import fs from "fs"


//nodejs inbyggda moduler 


//addEventListener("click" , callback(e))

//fs.readFile(" path till filen den ska läsa" , callback)

 fs.readFile("./dagensagenda", (err, data)=> {
    //console.log(err);
    console.log(data.toString()) 
    
    //buffer 12 32 44  -> encode -  decode med toString() 
}) 

// skriva filer i systemet

//fs.writeFile("var man vill skriva", " vad man vill skriva" , callback)


fs.writeFile("./index.html", 
             "hello från node js", (err)=>{

    console.log(err)
})
 

// skapa en server och serverar data till client/browser

//http.createServer(  callback )

const server = http.createServer( (request, response) =>{
    //client skickar request data
    response.write(" Hello from node server");
    response.end() //Stänger kopplingen 
})

server.listen(8000);

// expressjs: man enkelt skapa apier, server, routing 

// 11.00 








//  trejeparts /third party modules -> npm install paketname/module
//  name -> import with require 

console.log("hej från fed20s");