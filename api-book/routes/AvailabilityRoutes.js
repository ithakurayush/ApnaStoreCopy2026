const express = require('express')
const bodyParser = require('body-parser')

const AvailabilityController = require('../controllers/AvailabilityController')

const route = express.Router()

route.use(bodyParser.json())

route.use(bodyParser.urlencoded({
    extended: false
}))


route.post('/add/availability', (req, res) => {
    AvailabilityController.addAvailability(req, res)
})


route.get('/availability', (req, res) => {
    AvailabilityController.getAvailability(req, res)
})


route.delete('/delete/availability/:id', (req, res) => {
    AvailabilityController.deleteAvailability(req, res)
})


route.get('/availability/for/edit/:id', (req, res) => {
    AvailabilityController.getAvailabilityForEdit(req, res)
})


route.put('/edit/availability/:id', (req, res) => {
    AvailabilityController.editAvailability(req, res)
})


route.get('/availability/:id', (req, res) => {
    AvailabilityController.getAvailabilityById(req, res)
})


module.exports = route