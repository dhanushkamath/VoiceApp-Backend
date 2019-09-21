const express = require ('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const db = "mongodb+srv://mongoadmin:mongo1234@cluster0-w4udq.mongodb.net/test?retryWrites=true&w=majority"

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
mongoose.connect(db, err => {
    if(err) {
        console.error('Error! ' + err)
    }
    else {
        console.log("Successfully connected to MongoDB")
    }
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }

    let payload = jwt.verify(token, 'BentleyContinental')
    
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }

    req.userId = payload.subject
    console.log('User ID : ',payload,' logged in')
    next()
}

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req,res)=> {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if(error){
            console.log(error)
        }
        else{
            let payload = { subject: registeredUser._id}
            let token = jwt.sign(payload, 'BentleyContinental')
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req,res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if(!user){
                res.status(401).send("Login Failed")
            }
            else
            if( user.password !== userData.password) {
                res.status(401).send('Invalid password')
            } else {
                let payload = {subject: user._id}
                let token = jwt.sign(payload, 'BentleyContinental')
                res.status(200).send({token})
            }
        }
    })
})

router.get('/events', (req,res) => {
    let events = [
        {
            "name" : "John",
            "price" : "$450",
            "date" : "2012-04-23T18:25:43.511Z",
            "type" : "Credit",
            "reference" : "Gift",
            "_id" : "1"

        },
        {
            "name" : "Alice",
            "price" : "$300",
            "date" : "2012-05-23T20:00:00.511Z",
            "type" : "Credit",
            "reference" : "Rent",
            "_id" : "2"

        }


    ]

    res.json(events)
})

router.get('/special',verifyToken, (req,res) => {
    let events = [
        {
            "name" : "John",
            "price" : "$450",
            "date" : "2012-04-23T18:25:43.511Z",
            "type" : "Credit",
            "reference" : "Gift",
            "_id" : "1"

        },
        {
            "name" : "Alice",
            "price" : "$300",
            "date" : "2012-05-23T20:00:00.511Z",
            "type" : "Credit",
            "reference" : "Rent",
            "_id" : "2"

        },
        {
            "name" : "Bob",
            "price" : "$250",
            "date" : "2012-06-23T19:45:19.511Z",
            "type" : "Credit",
            "reference" : "Groceries",
            "_id" : "3"

        },
    ]

    res.json(events)
})

module.exports = router
