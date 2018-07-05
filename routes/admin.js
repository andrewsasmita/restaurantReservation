const express = require('express')
const router = express.Router()
const models = require('../models')
let sendEmail = require('../helpers/sendEmail')

//admin
router.get('/', (req, res) => {
  models.Restaurant.findAll({
    order: [['id', 'DESC']]
  })
  .then(restaurants => {
    // res.json(restaurants)
    res.render('adminViewRestaurant', {
      restaurants: restaurants,
      err: null
    })
  })
  .catch(err => res.json(err))
})

router.get('/restaurants/add', (req, res) => {
  res.render('adminAddRestaurant', {
    data: null,
    err: null
  })
})

router.post('/restaurants/add', (req, res) => {
  // res.json(req.body)
  models.Restaurant.create({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    table: req.body.table
  })
  .then(restaurant => {
    res.redirect('/admin')
  })
  .catch(err => {
    res.render('adminAddRestaurant', {
      data: req.body,
      err: err
    })
  })
})

router.get('/restaurants/:id/edit', (req, res) => {
  models.Restaurant.findById(req.params.id)
    .then(restaurant => {
      res.render('adminEditRestaurant', {
        restaurant: restaurant,
        err: null
      })
    })
    .catch(err => res.json(err))
})

router.post('/restaurants/:id/edit', (req, res) => {
  // res.json(req.body)
  models.Restaurant.update(req.body, {
    where: {id: req.params.id}
  })
    .then(() => res.redirect('/admin/'))
    .catch(err => res.json(err))
})

router.get('/restaurants/:id/delete', (req, res) => {
  models.Restaurant.findById(req.params.id)
    .then(restaurant => {
      res.render('adminDeleteRestaurant', {
        restaurant: restaurant,
        err: null
      })
    })
    .catch(err => res.json(err))
})

router.post('/restaurants/:id/delete', (req, res) => {
  models.Restaurant.destroy({ where: {id: req.params.id }})
  .then(() => {
    models.Reservation.destroy({ where: {RestaurantId: req.params.id}})
    .then(() => {
      res.redirect('/admin')
    })
  })
  .catch(err => res.json(err))
})

router.get('/restaurants/:id/view', (req, res) => {
  models.Reservation.findAll({
    attributes: [
      'id',
      'CustomerId',
      'RestaurantId',
      'time'
    ],
    include: [models.Customer],
    where: { RestaurantId: req.params.id }
  })
  .then(reservations => {
    // res.json(reservations)
    models.Restaurant.findById(req.params.id)
      .then(restaurant => {
        // res.json(reservations)
        res.render('adminViewReservations', {
          reservations: reservations,
          restaurant: restaurant,
          err: null
        })
      })
  })
  .catch(err => res.json('error'))
})

router.post('/restaurants/:id/view/:rsvpId/delete', (req, res) => {
  models.Reservation.destroy({
    where: {id: req.params.rsvpId}
  })
    .then(() => res.redirect(`/admin/restaurants/${req.params.id}/view`))
    .catch((err) => res.send(err))
})

router.get('/restaurants/:id/view/:rsvpId/email', (req, res) => {
  models.Reservation.findOne({
    attributes: [
      'id',
      'CustomerId',
      'RestaurantId',
      'time'
    ],
    include: [models.Customer, models.Restaurant],
    where: {id: req.params.rsvpId}
  })
  .then(reservation => {
    models.Restaurant.findById(req.params.id)
    .then(restaurant => {
      res.render('adminSendEmail', {
        reservation: reservation,
        restaurant: restaurant,
        err: null
      })
    })
  })
  .catch(err => res.send(err))
})

router.post('/restaurants/:id/view/:rsvpId/email', (req, res) => {
  // email function here
  // res.send('test')
  models.Reservation.findOne({
    attributes: [
      'id',
      'CustomerId',
      'RestaurantId',
      'time'
    ],
    include: [models.Customer, models.Restaurant],
    where: {id: req.params.rsvpId}
  })
  .then(reservation => {
    sendEmail(reservation.Customer, res)
  })
  .catch(err => res.json(err))
})

module.exports = router