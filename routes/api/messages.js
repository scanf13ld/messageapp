// routes/api/messages.js
//CSE 330 Creative Project
//Shane Canfield and Laura Bucchieri




const express = require('express');
const router = express.Router();
//const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const Message = require('../../models/Messages'); // Load Message model
const Conversation = require('../../models/Conversations'); // Load convo model

var aes256 = require("aes256");

var key = "ouhpr2h39hpawdnloi1h2neddwqd12";

const DoEncrypt = (text) => {
  var encrypted = aes256.encrypt(key, text);
  return encrypted;
};

const DoDecrypt = (cipher) => {
 
  var decrypted = aes256.decrypt(key, cipher);
  return decrypted;
};


// @route GET api/messages/test
// @description tests messages route
// @access Public
router.get('/test', (req, res) => res.send('message route testing!'));




// @route GET api/messages/:id
// @description Get all messages by conversation id
// @access Public
router.get('/:id', (req, res) => {
	console.log("here");
	let c_id = mongoose.Types.ObjectId(req.params.id);
	
	//let user1 = req.params.user1;
	let user1 = req.params.user1;
	console.log(user1);
	console.log(c_id);
	//let c_id = mongoose.Types.ObjectId(req.params.id);
	
	//console.log(user1);
	//console.log(c_id);
	//const isEncrypted = Conversation.find({$and : [{_id : c_id}, {encrypted : true }]});
	//isEncrypted;
	let messages;
	//Message.find({ user1: user1, user2: user1 }).sort({ created: -1})
	Message.find(  
	{ conversation_id : c_id } )
	.then(messages => res.json(messages))
	.catch(err => res.status(404).json({ nomessagesfound: 'No Messages found' }));
});

// @route GET api/messages/message/:id
// @description Get single messages by id
// @access Public
router.get('/message/:id', (req, res) => {
	console.log("here");
  Message.findById(req.params.id)
    .then(message => res.json(message))
    .catch(err => res.status(404).json({ nobookfound: 'No Message (by id) found' }));
});

// @route GET api/messages
// @description add/save message
// @access Public
router.post('/', (req, res) => {

	const newMessage = new Message({  
		user1: req.body.user1,
		user2: req.body.user2,
		message: req.body.message,
		send_time: req.body.send_time,
		conversation_id: req.body.conversation_id
    });
	
	
	newMessage.save()
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

// @route POST api/messages/conversation
// @description add/save conversation
// @access Public
router.post('/conversation', (req, res) => {
  Conversation.create(req.body)
    .then(conversation => {data: conversation.data })
    .catch(err => res.status(400).json({ error: 'Unable to add this conversation' }));
	
  //console.log(Conversation._id);
});

// @route GET api/messages/conversations
// @description display all conversations
// @access Public
router.get('/conversations/:id', (req, res) => {
  //console.log(req.params.user1);
  //let user1 = mongoose.Types.ObjectId(req.params.user1);
  let user1 = req.params.id;
  console.log(user1);
  Conversation.find(  
	{ $or : [  { user1 : user1 }, { user2 : user1 } ] })
    .then(conversations => res.json(conversations))
    .catch(err => res.status(404).json({ noconversationsfound: 'No conversations found' }));
});











module.exports = router;
