// routes/api/messages.js
//CSE 330 Creative Project
//Shane Canfield and Laura Bucchieri




const express = require('express');
const router = express.Router();
//const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const Message = require('../../models/Messages'); // Load Message model
const Conversation = require('../../models/Conversations'); // Load convo model
const GroupMember = require('../../models/GroupMembers'); // Load GroupMembers model
const GroupMessage = require('../../models/GroupMessages'); // Load GroupMessages model
const Group = require('../../models/Groups'); // Load Groups model

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


// @route DELETE api/messages/conversation/:id
// @description Delete converation by id
// @access Public
router.delete('/conversation/:id', (req, res) => {
  Conversation.findByIdAndRemove(req.params.id, req.body)
    .then(message => res.json({ mgs: 'Conversation entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such message' }));
});

// @route GET api/messages/conversation/messages/:id
// @description Delete messages by converation id
// @access Public
router.delete('/conversation/messages/:id', (req, res) => {
  Message.deleteMany({conversation_id: req.params.id })
    .then(group => res.json({ mgs: 'Conversation messages deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'Could not delete conversations messages' }));
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

// @route POST api/messages/group
// @description add/save group
// @access Public
router.post('/group', (req, res) => {
  var group_id = '';
  let owner = req.body.owner;
  let name = req.body.name;
  
  function addMember(group_id, name, owner){
	  let data = { group_id: group_id, name: name, username: owner };
	  console.log("Data: "+data);
	  GroupMember.create(data)
	   .then(groupmember => {data: groupmember.data })
		.catch(err => res.status(400).json({ error: 'Unable to add owner to groupmember' }));
  }
  
  console.log(req.body);
  Group.create(req.body)
    .then(
	function(group){

		group_id = mongoose.Types.ObjectId(group._id);

		addMember(group_id, name, owner);

	})
  
  
	
  //console.log(Group._id);
});

// @route GET api/messages/groups
// @description display all groups
// @access Public
router.get('/groups/:id', (req, res) => {
  //console.log(req.params.user1);
  //let user1 = mongoose.Types.ObjectId(req.params.user1);
  let user1 = req.params.id;
  console.log("here");
  console.log(user1);
  GroupMember.find(  
	{ username : user1 })
    .then(conversations => res.json(conversations))
    .catch(err => res.status(404).json({ nogroupsfound: 'No groups found' }));
});

// @route GET api/messages/groupmessages/
// @description add/save group message
// @access Public
router.post('/groupmessage/', (req, res) => {
	GroupMessage.create(req.body)
	  .then(message => res.json({ msg: 'Group message added successfully' }))
	  .catch(err => res.status(400).json({ error: 'Unable to add this group message' }));	
});


// @route GET api/messages/groupmessages/:id
// @description Get all messages by conversation id
// @access Public
router.get('/groupmessages/:id', (req, res) => {

	let g_id = mongoose.Types.ObjectId(req.params.id);
	
	GroupMessage.find(  
	{ group_id : g_id } )
	.then(messages => res.json(messages))
	.catch(err => res.status(404).json({ nomessagesfound: 'No Messages found' }));
});

router.delete('/group/:id', (req, res) => {
	
	Group.deleteOne({group_id: req.params.id })
    .then(group => res.json({ mgs: 'Group entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'Could not delete group' }));
  
});

router.delete('/group/messages/:id', (req, res) => {
	
	GroupMessage.deleteMany({group_id: req.params.id })
    .then(group => res.json({ mgs: 'Group messages deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'Could not delete group messages' }));
  
});

router.post('/group/members/', (req, res) => { //Works
	console.log(req.body);
	GroupMember.create(req.body)
	   .then(groupmember => {data: groupmember.data })
		.catch(err => res.status(400).json({ error: 'Unable to add new member to group' }));
  
});

router.put('/group/:id', (req, res) => {
	console.log(req.body);
	console.log(req.params.id);
	var newvalues = { $set: {name: req.body.name}};
	Group.updateOne({_id: req.params.id }, newvalues)
    .then(group => res.json({ mgs: 'Group entry changed successfully' }))
    .catch(err => res.status(404).json({ error: 'Could not change group name' }));
  
});











module.exports = router;
