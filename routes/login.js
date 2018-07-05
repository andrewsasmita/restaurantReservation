const router = require('express').Router()
const models = require('../models')

router.get('/', (req, res) => {
  res.render('login')
  //res.json({ status: 'login' })
})

router.post('/', (req, res) => {
  let email = req.body.email
  let password = req.body.password
  models.Customer.findOne({
    where: {email : email, password : password}
  })
  .then(customer => {
    req.session.customerName = `${customer.firstName} ${customer.lastName}`
    req.session.customerId = customer.id
    // res.render('reservations', {customer : customer})
    res.redirect('/reservations')
    //res.json(customer)
  })
  .catch(error => {
    res.json({error})
  })
  //res.json({ status: 'test' })
})


module.exports = router