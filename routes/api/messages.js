// routes/api/messages.js
//CSE 330 Creative Project
//Shane Canfield and Laura Bucchieri

const express = require('express');
const router = express.Router();


const Message = require('../../models/Messages'); // Load Message model

// @route GET api/messages/test
// @description tests messages route
// @access Public
router.get('/test', (req, res) => res.send('message route testing!'));

// @route GET api/messages
// @description Get all messages
// @access Public
router.get('/', (req, res) => {
  Message.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(404).json({ nomessagesfound: 'No Messages found' }));
});

// @route GET api/messages/:id
// @description Get single messages by id
// @access Public
router.get('/:id', (req, res) => {
  Message.findById(req.params.id)
    .then(message => res.json(message))
    .catch(err => res.status(404).json({ nobookfound: 'No Message found' }));
});

// @route GET api/messages
// @description add/save message
// @access Public
router.post('/', (req, res) => {
  Message.create(req.body)
    .then(message => res.json({ msg: 'Message added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this message' }));
});


// @route GET api/messages/:id
// @description Delete message by id
// @access Public
router.delete('/:id', (req, res) => {
  Message.findByIdAndRemove(req.params.id, req.body)
    .then(message => res.json({ mgs: 'Message entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such message' }));
});

module.exports = router;
