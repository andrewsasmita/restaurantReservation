const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({ status: 'login' })
})

router.post('/', (req, res) => {
  // res.json({ status: 'test' })
})


module.exports = router