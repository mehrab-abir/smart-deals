const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const products = require('./products.json')
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Server is running");
})

app.get('/products',(req,res)=>{
    res.send(products)
})

//smart-deals-user
//qKPq6WGWAMc6eJ36
const uri = "mongodb+srv://smart-deals-user:qKPq6WGWAMc6eJ36@cluster0.zvein0m.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run(){
    try{
        await client.connect();

        const db = client.db("smart-deals-db");
        const usersCollection = db.collection("users")

        //save user to db
        app.post('/users',async (req,res)=>{
            const newUser = req.body;
            const userExist = await usersCollection.findOne({ email: req.body.email });

            if(userExist){
                res.send({message: "User already exists. Not Posted."});
            }
            else{
                const afterPost = await usersCollection.insertOne(newUser);
            res.send(afterPost);
            }
        })


        await client.db("admin").command({ping:1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{

    }
}
run().catch(console.dir);

app.listen(port, ()=>{
    console.log(`Server is running on port:${port}`);
})

