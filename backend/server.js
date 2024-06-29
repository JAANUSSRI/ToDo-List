const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;
const uri = "mongodb://localhost:27017";
const dbName = "iplab";

app.use(cors());
app.use(bodyParser.json());

async function connect() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to MongoDB server");
  const db = client.db(dbName);
  const todosCollection = db.collection("todos");

  // Get all todos
  app.get('/todos', async (req, res) => {
    try {
      const todos = await todosCollection.find({}).toArray();
      res.status(200).json(todos);
    } catch (err) {
      console.error("Error retrieving todos:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Add a new todo
  app.post('/todo', async (req, res) => {
    const { text } = req.body;
    try {
      await todosCollection.insertOne({ text, completed: false });
      res.status(201).json({ message: 'Todo added' });
    } catch (err) {
      console.error("Error adding todo:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Update a todo's text or completion status
  app.patch('/todo/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body; // Contains new text, completed status, or both
    try {
      await todosCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      res.status(200).json({ message: 'Todo updated' });
    } catch (err) {
      console.error("Error updating todo:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Delete a specific todo
  app.delete('/todo/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Todo deleted' });
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch (err) {
      console.error("Error deleting todo:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Delete all completed todos
  app.delete('/todos/completed', async (req, res) => {
    try {
      const result = await todosCollection.deleteMany({ completed: true });
      res.status(200).json({ message: 'Completed todos deleted', deletedCount: result.deletedCount });
    } catch (err) {
      console.error("Error deleting completed todos:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Delete all todos
  app.delete('/todos/all', async (req, res) => {
    try {
      const result = await todosCollection.deleteMany({});
      res.status(200).json({ message: 'All todos deleted', deletedCount: result.deletedCount });
    } catch (err) {
      console.error("Error deleting all todos:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

connect();