const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 3000
const api = require('./routes/api')
const app = express()

// Since frontend and backend are running on two different ports
// cors middleware has to be added
app.use(cors())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json())

app.use('/api',api)

app.get('/', (req,res) => {
    res.send('Hello from Server')
})

app.listen(PORT, ()=> {
    console.log('Server running on localhost: ' + PORT)
})