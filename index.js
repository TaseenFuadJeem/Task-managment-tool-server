const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fzvye.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {

        await client.connect();
        const taskCollection = client.db("task-management").collection('tasks');

        app.post('/add-a-new-task', async (req, res) => {

            const task = req.body;

            const result = await taskCollection.insertOne(task);

            res.send(result);

        });

        app.get("/all-tasks", async (req, res) => {

            const result = await taskCollection.find({}).toArray();

            res.send(result);

        });

    }
    finally {

    }

};

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Task Management Tool Server");
});

app.listen(port, () => {
    console.log("Running successfully : ", port);
})