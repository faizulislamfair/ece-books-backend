const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://ece-books:nAQs2gPHg033QcmB@cluster0.pqumcav.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const bookCollection = client.db('eceBooks').collection('books');


        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = bookCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })


        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await bookCollection.insertOne(user);
            res.send(result);
        })


        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: ObjectId(id) }
            const result = await bookCollection.deleteOne(query);
            console.log(result);
            res.send(result);
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