const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const admin = require("firebase-admin");
const port = process.env.PORT || 3000;

const serviceAccount = require("./smart-deals-firebase-admin-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


//middleware for all
app.use(express.json());
app.use(cors());

//middleware for token verification --for some specific route
const verifyFirebaseToken = async (req,res,next) =>{
    if (!req.headers.authorization){
        return res.status(401).send({message: "unauthorized access"});
    }
    
    const token = req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).send({ message: "unauthorized access" });
    }

    //validate token
    try{
        const decode = await admin.auth().verifyIdToken(token);
        // console.log("After token validation: ",decode); //decoded
        req.token_email = decode.email;

        //proceed to the next process,,whatever it is in the api definition
        next();
    }
    catch{
        return res.status(401).send({ message: "unauthorized access" });
    }
}


app.get('/', (req, res) => {
    res.send("Server is running");
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zvein0m.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const db = client.db("smart-deals-db");
        const usersCollection = db.collection("users")
        const productCollection = db.collection('products');
        const bidsCollection = db.collection("bids");

        //products api
        app.get('/products', async (req, res) => {
            const productCursor = productCollection.find().sort({ created_at: -1 });
            const products = await productCursor.toArray();
            res.send(products);
        })

        //single product
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const singleProduct = await productCollection.findOne({ _id: new ObjectId(id) });
            res.send(singleProduct);
        })

        //Post a product
        app.post('/products',async (req,res)=>{
            const newProduct = req.body;
            const afterPost = await productCollection.insertOne(newProduct);
            res.send(afterPost)
        })

        //get my products
        app.get('/myproducts',verifyFirebaseToken, async(req,res)=>{
            const email = req.query.email;

            //reject unauthorized access email
            if(email !== req.token_email){
                return res.status(403).send({message : "forbidden access"});
            }

            const productCursor = productCollection.find({email:email}).sort({created_at:1});
            const myProducts = await productCursor.toArray();
            res.send(myProducts);
        })

        //delete a product from my products
        app.delete('/products/:id',async (req,res)=>{
            const id = req.params.id;
            const afterDelete = await productCollection.deleteOne({_id : new ObjectId(id)});
            res.send(afterDelete)
        })

        //change status to "Sold" from "pending" by clicking on "Make sold" button and vice versa
        app.patch('/products/:id',async (req,res)=>{
            const id = req.params.id;
            const {status} = req.body; //destructuring status as it came inside json obj
            const afterUpdate = await productCollection.updateOne(
                {_id : new ObjectId(id)},
                {
                    $set : {status : status}
                }
            )

            res.send(afterUpdate);
        })

        // edit/update product info
        app.patch('/editproducts/:id',async (req,res)=>{
            const id= req.params.id;
            const updatedInfo = req.body;

            const afterUpdate = await productCollection.updateOne(
                {_id : new ObjectId(id)},
                {
                    $set : {
                        title : updatedInfo.title,
                        price_min : updatedInfo.price_min,
                        price_max : updatedInfo.price_max
                    }
                }
            )

            res.send(afterUpdate)
        })

        //save user to db
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const userExist = await usersCollection.findOne({ email: req.body.email });

            if (userExist) {
                res.send({ message: "User already exists. Not Posted." });
            }
            else {
                const afterPost = await usersCollection.insertOne(newUser);
                res.send(afterPost);
            }
        })

        //post a bid
        app.post('/bids', async (req, res) => {
            const bidBody = req.body;

            const bidToInsert = {
                ...bidBody,
                productId: new ObjectId(bidBody.productId),
            }
            const afterPost = await bidsCollection.insertOne(bidToInsert);
            res.send(afterPost);
        })

        //join bid document with matched product and send to frontend
        app.get('/mybids',verifyFirebaseToken, async(req, res) => {
            try {
                // console.log('headers',req.headers);

                const email = req.query.email;

                if(email !== req.token_email){
                    return res.status(403).send({message: "forbidden access"});
                }
                
                //join bid documents with the corresponding product document
                const result = await bidsCollection.aggregate([
                    {$match : {bidder_email : email}},
                    {
                        $lookup : {
                            from : "products", //look for matched product in 'products' collection
                            localField : "productId", //of 'bids'
                            foreignField : "_id", //from 'product'
                            as : "product", //make an array with the matched 'product' as "product"[array name -> product]
                        }
                    },
                    {$unwind : "$product"}, //convert the array to object
                ]).toArray();

                res.send(result);
            }
            catch(err){
                console.error(err);
                res.status(500).send({message: "Failed to load bids"});
            }
            
        })

        //delete a bid from 'my bids'
        app.delete('/mybids/:id',async(req,res)=>{
            const id = req.params.id;
            const afterDelete = await bidsCollection.deleteOne({_id : new ObjectId(id)});
            res.send(afterDelete)
        })

        //get all bids of a product
        app.get('/bids/:id',async(req,res)=>{
            const id = req.params.id;
            const cursor = bidsCollection.find({productId:new ObjectId(id)});
            const bids = await cursor.toArray();
            res.send(bids);
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
})

