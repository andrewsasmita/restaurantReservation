const express = require('express')
const app = express ()
const ejs = require ('ejs')
const session = require('express-session')

const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const reservationRoute = require('./routes/reservations')


app.set('view engine', 'ejs')
app.set('trust proxy', 1)

app.use(session({
  secret: 'p240o8yth',
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({extended : false}))

// login & register
app.use('/', loginRoute)
app.use('/login', loginRoute)
app.use('/register', registerRoute)

// admin section
// app.use('/dashboard', adminRoute)

// user section
app.use('/reservations', reservationRoute)

app.listen(3000, () => {
  console.log('listening on port 3000')
})