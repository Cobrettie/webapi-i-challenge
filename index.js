// importing libraries
const express = require('express');

// import other files needed
const db = require('./data/db');

// import global objects
// creating simple server
const server = express();

// adding middleware
server.use(express.json());

// GET request to test if code is working properly
server.get('/', (req, res) => {
    res.send('<h1>Hello From Cobrettie</h1>')
});

// GET request to return an array of all user objects contained in the database
server.get('/api/users', (req, res) => {
    db.find()
        .then(allUsers => {
            res.status(200).json(allUsers) // res.json same as res.send, we just say send(res.) json
        })
        .catch(err => {
            res.status(500).json({
                error: 'The users information could not be retrieved'
            })
        })
});

// GET request to return user object with specified id
server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
    .then(user => {
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        }
    })
    .catch(() => {
        res.status(500).json({
            error: 'The user information could not be received'
        })
    })
})

// POST method
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    console.log('req.body', req.body);

    if(!name || !bio) {
        res
            .status(400)
            .json({ error: 'Please provide both name and bio for the user.'})
    } else {
        db.insert(req.body)
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(err => {
                res.status(500).json({
                    error: 'There was an error while saving the user to the database'
                })
            })
    }
})

// server now ready to receive requests
server.listen(4000, () => {
    console.log('server is running on port 4000...');
});