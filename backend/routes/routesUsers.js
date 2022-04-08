const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const bcrypt = require('bcrypt');

// get all users
router.get('/', async(req, res) => {
    const allUsers = await User.find();
    console.log(allUsers);
    res.send(allUsers);
});

// post one user
router.post('/', async(req, res) => {
    const saltRounds = 10;
    let pwHash = '';
    await bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (errHash, hash) => {
            pwHash = hash;
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: pwHash
            });
            console.log('newUser', newUser);
            newUser.save();
            res.send(newUser);
        });
    });
});

// get one user via email and password
router.post('/login/:email', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        let sendPw = req.body.password;
        let userPW = user.password;
        bcrypt.compare(sendPw, userPW, (err, result) => {
            if (result) {
                console.log('password correct!');
                res.send(user);
            } else {
                console.log('wrong password!');
                res.status(403);
                res.send({
                    error: "Wrong password!"
                });
            }
        });
    } catch {
        res.status(404);
        res.send({
            error: "User does not exist!"
        });
    }
});

// get one user via username
router.get('/:email', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        console.log(req.params);
        res.send(user);
    } catch {
        res.status(404);
        res.send({
            error: "User does not exist!"
        });
    }
});

// update one user via id
router.patch('/:email', async(req, res) => {
    try {
        const user = await User.findOne({ username: req.params.email })

        if (req.body.name) {
            user.name = req.body.name
        }

        if (req.body.email) {
            user.email = req.body.email
        }

        if (req.body.password) {
            user.password = req.body.password
        }

        await User.updateOne({ email: req.params.email }, user);
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: "User does not exist!" })
    }
});

// delete one user via id
router.delete('/:id', async(req, res) => {
    try {
        await User.deleteOne({ username: req.params.email })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "User does not exist!" })
    }
});




module.exports = router;