const express = require('express')

const passport = require('passport')

const router = express.Router()

const Book = require('./../models/book')

const customErrors = require('../../lib/custom_errors')

const requireOwnership = customErrors.requireOwnership

const requireToken = passport.authenticate('bearer', { session: false })

const handle404 = require('./../../lib/custom_errors')

const removeBlanks = require('../../lib/remove_blank_fields')

router.get('/books', requireToken, (req, res, next) => {
  Book.find({ owner: req.user.id })
    .then((books) => {
      res.status(200).json({ books })
    })
    .catch(next)
})

router.get('/books/:id', requireToken, (req, res, next) => {
  Book.findById(req.params.id)
    .then(handle404)
    .then((book) => {
      res.status(200).json({ book: book.toObject() })
    })
    .catch(next)
})

router.post('/books', requireToken, (req, res, next) => {
  // console.log(req)
  req.body.owner = req.user._id

  Book.create(req.body)
    .then(book => res.status(201).json({ book }))
    .catch(next)
})

router.patch('/books/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.book.owner

  Book.findById(req.params.id)
    .then(handle404)
    .then(book => {
      requireOwnership(req, book)

      return book.updateOne(req.body.book)
    })
    .then(book => res.json({ book }))
    .catch(next)
})

router.delete('/books/:id', requireToken, (req, res, next) => {
  Book.findById(req.params.id)
    .then(handle404)
    .then((book) => {
      requireOwnership(req, book)

      book.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
