const express = require("express");
const mongoose = require("mongoose");
const app = express();




// client - Middleware - server 

//  egen customised middleware 

    // app.use  (   (req, res, next)=>{   
        
    //  jsobject = req.body.data  
    // enlist = jsobject.id 
    
     // next()   }    )

app.use( express.json()   )


// oobligatoriskt / behövs inte om man har views i views folder 
// app.set("views", "./views")

app.set("view engine", "ejs")

// vi måste npm i ejs 
   // behövs inte require()



const products = [

    {
        name: "shirt",
        price:900
    }, 
    {
        name: "shirt 2",
        price:1200
    }, 
    {
        name: "shirt 3",
        price: 1000
    }
]


// radera data från listan  , delete 

// uppdatera något från listan 
//client --> server 
// skriver samma route  /  path  flera 


// rakib.se/yrke   
// rakib.se/aboutme
// rakib.se/api  
// route
// läsa get rakib.se  
          //  404
app.get("/", (req, res)=>{

   //console.log(req)
   // console.log(res)
   // console.table() console.warn()

//production miljö

 //res.send("Application is running")

 // res.json()
 
 
 
 const firstDataFromList =  products[0]
 res.render("index.ejs", {data: firstDataFromList})


 // js + html -> skapas av express , 

   // får data från api när express renderar den

    //res.statusCode(200).json()

})


app.post("/register", (req, res)=>{
  
    const userInfo=  req.body


   res.send("inskriven")

})



app.delete("/:id" , (req , res)=>{
     // req.params.id -> number(req.params.id)
    //   hantera lista 
    const params = Number(req.params.id)
   // products.splice(vilkenIndex, 1)
    products.splice(params, 1)
    res.send(products)
})




app.put("/:id", (req, res)=>{
    //update data in i database
    // updatera data från en lista 
    // Number(req.params.id)  // index nummer 
    // vilken data användare vill uppdatera från listan
    // vad vill användare lägga till /den nya datan
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    // table.data.update()
    // products List [indexnummer ] = den nya datan
    products[Number(req.params.id)] = product
    res.send(products)
})


// get --->   find()
// post , ---> // new createData()
// put,   ----> // update()
// delete  ----> // delete()

//
mongoose.connect("mongodb+srv://fed20s:Fed20s@cluster0.4t6xn.mongodb.net/<dbname>?retryWrites=true&w=majority", ()=>{

 console.log("connected to db")

 app.listen(8000, ()=>{
    
})

})



