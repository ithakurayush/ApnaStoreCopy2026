const BookAtPlace = require('../models/BookAtPlace')

const addAvailability = async (req, res) => {
  try {

    let availability = new BookAtPlace(req.body)

    await availability.save()

    res.status(200).send({
      message: 'Availability Has Been Add Successfully'
    })

  } catch (error) {

    console.log(error)

    res.status(400).send({
      message: 'Something Went Wrong'
    })

  }
}


const getAvailability = async (req, res) => {
  try {

    let availability = await BookAtPlace.find({})
      .populate('book')

    res.status(200).send({
      data: availability
    })

  } catch (error) {

    console.log(error)

    res.status(400).send({
      message: error
    })

  }
}


const deleteAvailability = async (req, res) => {
  try {

    let id = req.params.id

    await BookAtPlace.deleteOne({
      _id: id
    })

    res.status(200).send({
      success: true
    })

  } catch (error) {

    console.log(error)

    res.status(400).send({
      success: false
    })

  }
}


const getAvailabilityForEdit = async (req, res) => {
  try {

    let id = req.params.id

    let availability = await BookAtPlace.findOne({
      _id: id
    }).populate('book')

    res.status(200).send({
      data: availability
    })

  } catch (error) {

    console.log(error)

    res.status(400).send({
      data: error
    })

  }
}


const editAvailability = async (req, res) => {
  try {

    let id = req.params.id

    await BookAtPlace.updateOne(
      {
        _id: id
      },
      req.body
    )

    res.status(200).send({
      success: true
    })

  } catch (error) {

    console.log(error)

    res.status(400).send({
      success: false
    })

  }
}


const getAvailabilityById = async (req, res) => {
  try {

    const availability = await BookAtPlace.findById(
      req.params.id
    ).populate('book')

    if (!availability) {

      return res.status(404).send({
        message: 'Availability not found'
      })

    }

    res.status(200).send({
      data: availability
    })

  } catch (error) {

    console.log('GET AVAILABILITY BY ID ERROR:', error)

    res.status(400).send({
      message: error.message
    })

  }
}


module.exports = {
  addAvailability,
  getAvailability,
  deleteAvailability,
  getAvailabilityForEdit,
  editAvailability,
  getAvailabilityById
}