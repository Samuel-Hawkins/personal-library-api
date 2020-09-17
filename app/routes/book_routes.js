const express = require('express')

const router = express.Router()

const Book = require('./../models/book')

const handle404 = require('./../../lib/custom_errors')

router.get('/books', (req, res, next) => {
  Book.find(console.log)
    .populate('owner')
    .then((books) => {
      res.status(200).json({ books })
    })
    .catch(next)
})

router.get('/books/:id', (req, res, next) => {
  console.log(req.params)

  const id = req.params.id

  Book.findById(id)
    .then(handle404)
    .then((book) => {
      res.status(200).json({ book })
    })
    .catch(next)
})

router.post('/books', (req, res, next) => {
  const bookData = req.body.book

  Book.create(bookData)
    .then(book => res.status(201).json({ book }))
    .catch(next)
})

router.patch('/books/:id', (req, res, next) => {
  console.log(req.params)

  const id = req.params.id

  const bookData = req.body.book

  Book.findById(id)
    .then(handle404)
    .then(book => book.updateOne(bookData))
    .then(book => res.json({ book }))
    .catch(next)
})

router.delete('/books/:id', (req, res, next) => {
  const id = req.params.id

  Book.findById(id)
    .then(handle404)
    .then((book) => {
      book.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
