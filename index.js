const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// middlewares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pqumcav.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// console.log(uri);


async function run() {
    try {

        const bookCollectionOne = client.db('eceBooks').collection('oneOne');


        app.get('/firstsem', async (req, res) => {
            const query = {};
            const cursor = bookCollectionOne.find(query);
            const oneOneBooks = await cursor.toArray();
            res.send(oneOneBooks);
        })


    }
    finally {

    }
}

run().catch(err => console.log(err));




app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center">Ece Books Server is Running!</h1>');
})


app.listen(port, () => {
    console.log(`Ece Books Listening on Port: ${port}`);
})