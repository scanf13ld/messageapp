// app.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

const express = require('express');
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");

//DB config
const connectDB = require('./config/db');

var cors = require('cors');

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// routes
const messages = require('./routes/api/messages');

app.use("/api/users", users);



connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/messages', messages);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
