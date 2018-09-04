const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./router.js')

const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', router)

app.use(express.static(path.join(__dirname, '../static')))

app.listen(3000, () => console.log('Express server listening on port 3000!'))