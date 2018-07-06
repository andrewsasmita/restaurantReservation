const express = require('express')
const app = express()
const ejs = require ('ejs')
const session = require('express-session')
const isAuthorized = require('./middleware/authorization')
const isAuthenticated = require('./middleware/authentication')

const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const reservationRoute = require('./routes/reservations')
const adminRoute = require('./routes/admin')
const logoutRoute = require('./routes/logout')

app.locals.hourConverter = require('./helpers/hourConverter')
app.locals.hourViewConverter = require('./helpers/hourViewConverter')

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
app.use('/logout', logoutRoute)

// admin section
app.use('/admin', isAuthorized, adminRoute)

// user section
app.use('/reservations', isAuthenticated, reservationRoute)
app.use('/customer', isAuthenticated, require('./routes/customer'))
app.use('/contact', require('./routes/contact'))


app.listen(3000, () => {
  console.log('listening on port 3000')
})