const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/user'); // Assurez-vous que le chemin est correct

const app = express();
app.use(bodyParser.json());

const checkAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).send('Admin permissions required.');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, 'your_jwt_secret'); // Remplacez 'your_jwt_secret' par votre secret JWT
    if (decodedToken.type !== 'admin') {
      return res.status(403).send('Admin permissions required.');
    }
    next();
  } catch (error) {
    return res.status(403).send('Invalid token.');
  }
};

app.get('/users', checkAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ error: 'Failed to fetch users' });
  }
});

app.patch('/usertype', checkAdmin, async (req, res) => {
  try {
    const { id, newType } = req.body;
    await User.updateOne({ id }, { type: newType });
    res.status(200).send({ id, newType });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).send({ error: 'Failed to update user role' });
  }
});

app.delete('/user', checkAdmin, async (req, res) => {
  try {
    const { id } = req.body;
    await User.deleteOne({ id });
    res.status(200).send({ id });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ error: 'Failed to delete user' });
  }
});

app.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ error: 'Failed to create user' });
  }
});

mongoose.connect('mongodb://localhost:27017/conferenceDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(4555, () => console.log('Server is running on port 4555')))
  .catch(err => console.error('Failed to connect to MongoDB', err));
