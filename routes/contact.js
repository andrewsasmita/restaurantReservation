const router = require('express').Router()
const models = require('../models')

router.get('/', (req, res) => {
  res.render('contact')
})

router.post('/', (req, res) => {
  
})


module.exports = router