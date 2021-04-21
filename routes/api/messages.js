// routes/api/messages.js

const express = require('express');
const router = express.Router();

// Load Message model
const Message = require('../../models/Messages');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('message route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  Message.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(404).json({ nomessagesfound: 'No Messages found' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  Message.findById(req.params.id)
    .then(message => res.json(message))
    .catch(err => res.status(404).json({ nobookfound: 'No Message found' }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post('/', (req, res) => {
  Message.create(req.body)
    .then(message => res.json({ msg: 'Message added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this message' }));
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  Message.findByIdAndUpdate(req.params.id, req.body)
    .then(message => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Message.findByIdAndRemove(req.params.id, req.body)
    .then(message => res.json({ mgs: 'Message entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a message' }));
});

module.exports = router;
