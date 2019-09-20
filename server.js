const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 3000
const api = require('./routes/api')
const proxy = require('./routes/proxy')
const app = express()

// Since frontend and backend are running on two different ports
// cors middleware has to be added
app.use(cors())

app.use(bodyParser.json())

app.use('/api',api)

app.use('/proxy', proxy)

app.get('/', (req,res) => {
    res.send('Hello from Server')
})

app.listen(PORT, ()=> {
    console.log('Server running on localhost: ' + PORT)
})