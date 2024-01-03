const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', (req, res) => res.send('Hello Wsdfeorld!'))



// Listen
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))