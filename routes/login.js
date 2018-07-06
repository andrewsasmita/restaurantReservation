const router = require('express').Router()
const models = require('../models')

router.get('/', (req, res) => {
  res.render('login', {
    err: null
  })
  //res.json({ status: 'login' })
})

router.post('/', (req, res) => {
  let email = req.body.email
  let password = req.body.password
  models.Customer.findOne({
    where: {email : email, password : password}
  })
  .then(customer => {
    req.session.customer = customer
    req.session.customerId = customer.id
    // res.render('reservations', {customer : customer})
    if(req.session.customer.role === 'admin') {
      res.redirect('/admin')
    }
    res.redirect('/reservations')
    //res.json(customer)
  })
  .catch(error => {
    res.render('login', {
      err: error
    })
  })
  //res.json({ status: 'test' })
})


module.exports = router