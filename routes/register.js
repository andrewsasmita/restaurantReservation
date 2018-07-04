const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({ status: 'register' })
})

router.post('/', (req, res) => {
  res.json({ status: 'test' })
})

module.exports = router