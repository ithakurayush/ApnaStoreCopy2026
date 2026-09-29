import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'

const apiUrl = import.meta.env.VITE_API_URL

function AddAvailability() {

    let [books, setBooks] = useState([])

    let [availability, setAvailability] = useState({
        book: '',
        pinCode: '',
        isAvailable: false
    })

    let [message, setMessage] = useState('')

    // Get all books
    useEffect(() => {
    axios({
        url: apiUrl + '/books',
        method: 'get',
        params: {
            pageNo: 1,
            booksPerPage: 100
        }
    })
    .then((res) => {
        console.log('BOOK DATA:', res.data)
        setBooks(res.data.data)
    })
    .catch((err) => {
        console.log('BOOK ERROR:', err)
    })
}, [])

    // Handle input
    function handleChange(e) {

        let { name, value, type, checked } = e.target

        setAvailability({
            ...availability,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    // Submit availability
    function handleSubmit(e) {

        e.preventDefault()

        axios({
            url: apiUrl + '/admin/availability',
            method: 'post',
            data: availability
        })
        .then((res) => {

            console.log(res.data)

            setMessage('Book availability added successfully.')

            setAvailability({
                book: '',
                pinCode: '',
                isAvailable: false
            })

        })
        .catch((err) => {

            console.log(err)
            setMessage('Something went wrong.')

        })
    }

    return (
        <Container className="py-4">

            <Row className="justify-content-center">

                <Col md={8} lg={6}>

                    <Card className="shadow-sm border-0">

                        <Card.Body className="p-4">

                            <h2  className="mb-4 text-center text-danger">
                                Availability
                            </h2>

                            {message && (
                                <div className="alert alert-info">
                                    {message}
                                </div>
                            )}

                            <Form onSubmit={handleSubmit}>

                                {/* Book */}
                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Select Book
                                    </Form.Label>

                                    <Form.Select
                                        name="book"
                                        value={availability.book}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a book</option>
                                                            
                                        {books.map((item) => (
                                            <option key={item._id} value={item._id}>
                                                {item.bookTitle}
                                            </option>
                                        ))}
                                    </Form.Select>

                                </Form.Group>


                                {/* PIN Code */}
                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        PIN Code
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="pinCode"
                                        value={availability.pinCode}
                                        onChange={handleChange}
                                        placeholder="Enter PIN code"
                                        required
                                    />

                                </Form.Group>


                                {/* Availability */}
                                <Form.Group className="mb-4">

                                    <Form.Check
                                        type="switch"
                                        id="availability-switch"
                                        name="isAvailable"
                                        label="Book is Available"
                                        checked={availability.isAvailable}
                                        onChange={handleChange}
                                    />

                                </Form.Group>


                                {/* Submit */}
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-100"
                                >
                                    Add Availability
                                </Button>

                            </Form>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>
    )
}

export default AddAvailability