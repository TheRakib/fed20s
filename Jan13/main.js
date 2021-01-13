const express = require("express");
const app = express();




// client - Middleware - server 

//  egen customised middleware 

    // app.use  (   (req, res, next)=>{   
        
    //  jsobject = req.body.data  
    // enlist = jsobject.id 
    
     // next()   }    )

app.use( express.json()   )


// oobligatoriskt / behövs inte om man har views i views folder 
app.set("views", "./views")

app.set("view engine", "ejs")



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

app.get("/", (req, res)=>{

   //console.log(req)
   // console.log(res)
   // console.table() console.warn()

//production miljö

 //res.send("Application is running")

 // res.json()
 const firstDataFromList =  products[0]
 res.render("index.ejs", {data: firstDataFromList})

    //res.statusCode(200).json()

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


app.listen(8000, ()=>{
    
})


// kl. 11. 30 