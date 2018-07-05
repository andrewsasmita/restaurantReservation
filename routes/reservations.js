const router = require('express').Router()
const models = require('../models')

const checkReservationLengthAndDuplicate = require('../helpers/checkReservationLength');
const checkReservationDuplicate = require('../helpers/checkReservationDuplicate')

router.get('/', (req, res) => {
  models.Reservation.findAll({
    attributes: [
      'id',
      'CustomerId',
      'RestaurantId',
      'time'
    ],
    include: [models.Restaurant, models.Customer],
    where: { CustomerId: 2 }
  })
    .then(reservations => {
      // res.json(reservations)
      res.render('reservations', {
        reservations: reservations 
      })
    })
    .catch(err => res.send(err))
})

router.get('/add', (req, res) => {
  models.Restaurant.findAll()
    .then(restaurants => {
      res.render('addReservation', {
        restaurants: restaurants,
        err: null
      })
      // res.json(restaurants)
    })
    .catch(err => res.json(err))
})

router.post('/add', (req, res) => {
  // res.json(req.body)
  let custId = 2;
  models.Reservation.findAll({
    include: [models.Restaurant],
    where: { 
      RestaurantId: req.body.restaurantId,
      time: req.body.time
    }
  })
  .then(reservations => {
    // res.json(reservations)
    // res.json(req.body)
    if (reservations.length !== 0) {
      checkReservationLengthAndDuplicate(reservations, custId, req, res);
    } else {
      // checkReservationDuplicate(custId, req, res)
      models.Reservation.create({
        CustomerId: custId,
        RestaurantId: req.body.restaurantId,
        time: req.body.time
      })
      .then((reservation) => {
        // res.json(reservation)
        res.redirect('/reservations')
      })   
    }
  })
  .catch(err => res.json(err))
})

router.get('/:id/edit', (req, res) => {
  models.Reservation.findOne({
    attributes: [
      'id',
      'CustomerId',
      'RestaurantId',
      'time'
    ],
    include: [models.Restaurant],
    where: { id: req.params.id }
  })
    .then((reservation) => {
      res.render('editReservation', {
        reservation: reservation,
        err: null
      })
    })
    .catch(err => res.json(err))
})

router.post('/:id/edit', (req, res) => {
  models.Reservation.update({time: req.body.time}, {
    where: {id: req.params.id}
  })
  .then(() => res.redirect('/reservations'))
  .catch((err) => res.json(err))
})

router.get('/:id/delete', (req, res) => {
  models.Reservation.findOne({
    attributes: [
      'id',
      'CustomerId',
      'RestaurantId',
      'time'
    ],
    include: [models.Restaurant],
    where: { id: req.params.id }
  })
  .then(reservation => {
    res.render('deleteReservation', {
      reservation: reservation,
      err: null
    })
  })
  .catch(err => res.send(err))
})

router.post('/:id/delete', (req, res) => {
  models.Reservation.destroy({ where: { id: req.params.id }})
    .then(() => res.redirect('/reservations'))
    .catch((err) => res.json(err))
})

module.exports = router