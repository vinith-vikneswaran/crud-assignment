const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

app.get('/', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get('/getUser/:id', (req, res) => {
    const userId = req.params.id;

    UserModel.findById(userId)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
    .then(users => res.json(users))
    .catch(err => {
        console.error("Error deleting user:", err);
        res.status(500).json(err);
    });
});

app.post("/createUser", (req, res) => {
    console.log("Request body:", req.body);
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => {
        console.error("Error creating user:", err);
        res.status(500).json(err);
    });
});

app.put("/updateUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    })
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
