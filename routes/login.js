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
    res.render('reservations', {customer : customer})
    //res.json(customer)
  })
  .catch(error => {
    res.json({error})
  })
  //res.json({ status: 'test' })
})


module.exports = router