const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// const uri = `mongodb://${process.env.USUARIO_MONGO}:${process.env.CONTRASENA_MONGO}@${process.env.MONGOHOST}:${process.env.MONGOPORT}`; 
uri = `mongodb+srv://admin:admin@cluster0.lh5stk6.mongodb.net/?appName=Cluster0`;

// Create a MongoClient instance
const client = new MongoClient(uri);

async function main() {
  try {
    // Connect to MongoDB
    await client.connect();

    // Select database and collection
    const db = client.db('BaseDePatos');
    const collection = db.collection('users');

    // Middleware to parse JSON
    app.use(express.json());

    // Serve static files from the "public" directory
    app.use(express.static('public'));

    // Example: Get all users
    app.get('/users', async (req, res) => {
      const users = await collection.find().toArray();
      res.json(users);
    });

    // Example: Add a user
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      await collection.insertOne(newUser);
      res.json({ message: 'User added successfully', user: newUser });
    });

    // Start server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

main();