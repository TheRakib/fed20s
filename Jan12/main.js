const express = require("express");


const app = express();

// skriver json data ->   skickar in ->  middleware
   // ->localhost:8000/products

   // json till js objekt

app.use( express.json()   )
 
// client -->  json data -->   
     // -->Middleware konvertera json till js objekt  ->server

// json 
// middleware

   // client  ->  middleware -> server

 

// products objekt till användare 

// i Framtiden products list ska komma från databasen
const products = [ {
    name:"random tshirt",
    price: 200
}, {
    name:"random tshirt 2",
    price: 2000
},
{
    name:"random tshirt 2",
    price: 2000
}
]

// products[1]
// req- request, res-response 
app.get("/", (req, res)=>{
    
    res.send(products)

})


/* app.get("/1", (req, res)=>{

    res.send(products[1])
})
 */


//user vill ha specifik produkt 

// params 


app.get("/:id", (req, res)=>{
    
    console.log(req.params)

    // id:  " 1 "

    const param = Number(req.params.id)
    // req.params.id
    res.send(products[ param ])

})


//app.post()

app.post("/products" ,(req, res)=> {

    // användare kommer att skriva data med nån klient
     
    // request body 
        // req.body.name
        // req.body.price
    
        console.log(req.body.name)

// incoming data / request body ska komma klient - > react, postman
//  json 
        const product= {
            name: req.body.name,
            price: req.body.price
        }
    //  name:" jeans"
     // price : 2000
     // vi ska läsa name, price och spara den i listan
     products.push(product)
     console.log(products)

     res.send("Products have been added")
})



app.listen(8000, (err)=> {
    console.log("appen körs i localhost:8000")
    console.log(err)
})


//kl.11.00