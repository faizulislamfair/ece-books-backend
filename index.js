const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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

        // const user = {
        //     name: 'someone',
        //     comment: 'nice'
        // }

        // const result = await bookCollection.insertOne(user);
        // console.log(result);

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