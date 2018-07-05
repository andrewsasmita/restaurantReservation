const express = require('express')
const router = express.Router()
const models = require('../models')

// '/customer'

router.get('/', function (req, res) {
    models.Customer.findOne({
        where : {id : req.session.customerId}
    })
    .then(customer => {
        //res.json(customer)
        res.render('customer', {customer})
    })
    .catch(error => {
        res.json(error)
    })
})

router.get('/edit', function (req, res) {
    res.render('customeredit')
})

router.post('/edit', function (req, res) {
    // let id = 1
    let edit = {}
    edit.firstName = req.body.firstName
    edit.lastName = req.body.lastName
    edit.email = req.body.email
    edit.password = req.body.password
    models.Customer.update(edit, {
        where : {id : req.session.customerId}
    })
    .then(() => {
        res.redirect('/customer')
    })
    .catch(error => {
        res.json({err})
    })
})

module.exports = router