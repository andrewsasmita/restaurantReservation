const models = require('../models');

module.exports = function (reservations, custId, req, res) {
  if (reservations.length >= reservations[0].Restaurant.table) {
    // re-render page with restaurant list and error message
   models.Restaurant.findAll()
   .then(restaurants => {
     res.render('addReservation', {
       restaurants: restaurants,
       err: 'reservation full, choose another time'
     })
   })
  } else {
    models.Reservation.findOne({
      where: {
        CustomerId: custId,
        RestaurantId: req.body.restaurantId
      }
    })
    .then(duplicate => {
      res.json(duplicate)
      if (duplicate) {
        models.Restaurant.findAll()
        .then(restaurants => {
          res.render('addReservation', {
            restaurants: restaurants,
            err: 'You already booked here'
          })
        })
      } 
      // else {
      //   models.Reservation.create({
      //     CustomerId: custId,
      //     RestaurantId: req.body.restaurantId,
      //     time: req.body.time
      //   })
      //   .then((reservation) => {
      //     // res.json(reservation)
      //     res.redirect('/reservations')
      //   })
      // }
    })
  }
}