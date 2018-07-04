const express = require('express')
const app = express ()
const ejs = require ('ejs')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : false}))

const routes = require('./routes')

// mainpage
app.use('/', require('./routes/login'))

// admin section
app.use('/', require('./routes/'))

// user section
app.use('/user')

app.listen(3000)