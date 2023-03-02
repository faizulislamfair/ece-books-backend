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
        const bookCollectionTwo = client.db('eceBooks').collection('oneTwo');
        const bookCollectionThree = client.db('eceBooks').collection('twoOne');
        const bookCollectionFour = client.db('eceBooks').collection('twoTwo');
        const bookCollectionFive = client.db('eceBooks').collection('threeOne');
        const bookCollectionSix = client.db('eceBooks').collection('threeTwo');
        const bookCollectionSeven = client.db('eceBooks').collection('fourOne');
        const bookCollectionEight = client.db('eceBooks').collection('fourTwo');

        const adminAccounts = client.db('eceBooks').collection('admins');



        app.get('/admins', async (req, res) => {
            const query = {};
            const cursor = adminAccounts.find(query);
            const admins = await cursor.toArray();
            res.send(admins);
        })


        app.get('/admins/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email };
            const user = await adminAccounts.findOne(query);
            res.send({ isAdmin: user?.role === 'Admin' });
        })


        app.get('/one_one', async (req, res) => {
            const query = {};
            const cursor = bookCollectionOne.find(query);
            const oneOneBooks = await cursor.toArray();
            res.send(oneOneBooks);
        })


        app.post('/one_one', async (req, res) => {
            const one_one = req.body;
            const result = await bookCollectionOne.insertOne(one_one);
            res.send(result);
        })



        app.get('/one_two', async (req, res) => {
            const query = {};
            const cursor = bookCollectionTwo.find(query);
            const oneTwoBooks = await cursor.toArray();
            res.send(oneTwoBooks);
        })

        app.get('/two_one', async (req, res) => {
            const query = {};
            const cursor = bookCollectionThree.find(query);
            const twoOneBooks = await cursor.toArray();
            res.send(twoOneBooks);
        })

        app.get('/two_two', async (req, res) => {
            const query = {};
            const cursor = bookCollectionFour.find(query);
            const twoTwoBooks = await cursor.toArray();
            res.send(twoTwoBooks);
        })

        app.get('/three_one', async (req, res) => {
            const query = {};
            const cursor = bookCollectionFive.find(query);
            const threeOneBooks = await cursor.toArray();
            res.send(threeOneBooks);
        })

        app.get('/three_two', async (req, res) => {
            const query = {};
            const cursor = bookCollectionSix.find(query);
            const threeTwoBooks = await cursor.toArray();
            res.send(threeTwoBooks);
        })

        app.get('/four_one', async (req, res) => {
            const query = {};
            const cursor = bookCollectionSeven.find(query);
            const fourOneBooks = await cursor.toArray();
            res.send(fourOneBooks);
        })

        app.get('/four_two', async (req, res) => {
            const query = {};
            const cursor = bookCollectionEight.find(query);
            const fourTwoBooks = await cursor.toArray();
            res.send(fourTwoBooks);
        })


    }
    finally {

    }
}

run().catch(err => console.log(err));




app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center">ECE Books Server is Running!</h1>');
})


app.listen(port, () => {
    console.log(`Ece Books Listening on Port: ${port}`);
})