const express = require("express");
const app = express();
const path = require("path");
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const PORT = 8080

//MiddLewars
app.use(express.json())
app.use(express.urlencoded({extend: true}))

//public fields
app.use(express.urlencoded(path.join(__dirname, 'public')))

//routes
app.use('/', productsRouter);
app.use('/', cartsRouter);

//html file
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index,html'))
})

app.listen (PORT , ()=>{ 
    console.log(`server listening on ${PORT}`)
 })