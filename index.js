// implement your API here

// importing libraries
const express = require('express');

// import other files needed
const db = require('./data/db');

// import global objects
// create simple server
const server = express();

// adding middleware
server.use(express.json());

// GET request to test if code is working properly
server.get('/', (req, res) => {
    res.send('Hello From Cobrettie')
});

// GET request to return an array of all user objects contained in the database
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.json(users)
            console.log('users', users)
        })
        .catch(err => {
            res.status(418).json({
                err: err,
                message: 'error'
            })
        })
});

// // POST method
// server.post('/api/users', (req, res) => {
//     const newUser = req.body;
//     console.log('newUser', newUser);
// })

// server now ready to receive requests
server.listen(4000, () => {
    console.log('server is running on port 4000...');
});