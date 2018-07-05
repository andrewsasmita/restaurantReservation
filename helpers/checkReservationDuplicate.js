const models = require('../models')

module.exports = function(custId, req, res) {
  models.Reservation.findOne({
    where: {
      CustomerId: custId,
      RestaurantId: req.body.restaurantId
    }
  })
  .then(duplicate => {
    // res.json(duplicate)
    if (duplicate) {
      models.Restaurant.findAll()
      .then(restaurants => {
        res.render('addReservation', {
          restaurants: restaurants,
          err: 'You already booked here'
        })
      })
    } 
  })
}