const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')


connectToMongo();

const app = express()
app.use(cors())
const port = 5400

app.use(express.json())
app.use(express.urlencoded({ extended: true })); // Middleware for form data

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
    res.send("Hello, World!");
    });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



