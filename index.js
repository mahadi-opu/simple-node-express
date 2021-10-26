const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;



const app =express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());


//user: mydbuser1
//pass: 4e6s4AESRCwYvdcM
//IP :103.120.162.238

const uri = "mongodb+srv://mydbuser1:4e6s4AESRCwYvdcM@cluster0.h1bkr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();

      //DATABASE NAME ard TABLE NAME
      const database = client.db("insertDB");
      const usersCollection = database.collection("users");
      // create a document to insert

      // GET API
      app.get('/users', async (req, res) => {
          const cursor = usersCollection.find({});
          const users = await cursor.toArray();
          res.send(users);
      });

      app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const users =  await usersCollection.findOne(query);
            console.log('load user with id: ', id);
            res.send(users);
      })


     //POST API
     app.post('/users', async (req, res) => {
       const newUser = req.body;
       const result = await usersCollection.insertOne(newUser);
       console.log('Hitting the post' , req.body);
       console.log('added use',result);
       res.json(result);
     });

     //DELETE API
     app.delete('/users/:id', async(req, res)=> {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await usersCollection.deleteOne(query);
        console.log('deleting user with id ', result);
        res.json(result);
     })


    }
    finally {
      // await client.close();
    }
  }
  run().catch(console.dir);




app.get('/', (req,res) => {
    res.send('Running my CRUD Server');
});

app.listen(port, () =>{
    console.log('Running server on port', port)
})