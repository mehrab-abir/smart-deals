const express = require('express');
const app = express();
const cors = require('cors');
const products = require('./products.json')
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Server okay");
})

app.get('/products',(req,res)=>{
    res.send(products)
})

app.listen(port, ()=>{
    console.log(`Server is running on port:${port}`);
})

