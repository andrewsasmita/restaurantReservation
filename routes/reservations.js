const router = require('express').Router()
const models = require('../models')

router.get('/', (req, res) => {
  models.Reservation.findAll({
    attributes: [
      'id',
      'CustomerId',
      'RestaurantId',
      'time'
    ],
    include: [models.Restaurant, models.Customer],
    where: { CustomerId: 1 }
  })
    .then(reservations => {
      // res.json(reservations)
      res.render('reservations', {
        reservations : reservations 
      })
    })
    .catch(err => res.send(err))
})

module.exports = router