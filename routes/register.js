const router = require('express').Router()
const model = require('../models')

router.get('/', (req, res) => {
  res.render('register')
  //res.json({ status: 'register' })
})

router.post('/', (req, res) => {
  let add = {}
  add.firstName = req.body.firstName
  add.lastName = req.body.lastName
  add.email = req.body.email
  add.password = req.body.password
  models.Customer.create(add)
  .then(() => {
    res.redirect('/login')
  })
  .catch(error => {
    res.json({error})
  })
  //res.json({ status: 'test' })
})



module.exports = router