const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
// const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();


// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3sh2wxl.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const usersCollection = client.db('togetherSM').collection('users');        
        const postsCollection = client.db('togetherSM').collection('posts');

        // get posts 
        app.get('/posts', async (req, res) => {
            const query = {};
            const users = await postsCollection.find(query).toArray();
            res.send(users);
        })

        // publish post
        app.post('/posts', async (req, res) => {
            const post = req.body;
            console.log(post)
            const result = await postsCollection.insertOne(post);
            res.send(result);
        });
        
        // get users 
        app.get('/users', async (req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        })
        // //  test
        // app.get('/hello', async (req, res) => {
        //     res.send("Hello .............");
        // })

        // create user
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user)
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });
    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', async (req, res) => {
    res.send('Together server is running on browser')
})

app.listen(port, () => console.log(`Together social media running on ${port}`))