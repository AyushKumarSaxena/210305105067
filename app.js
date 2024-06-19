const express = require("express")
const app = express()
const logger = require('morgan');

const cookieParser = require('cookie-parser');

require("dotenv").config()
const port = process.env.port || 3000

app.use(express.json())
app.use(cookieParser());
app.use(logger('dev'));

const route = require('./route/apiRoute');
app.use('http://20.244.56.144/test/', route);

app.listen(port, () => {
    console.log(`Server is running on :http://localhost:${port}`)
})
