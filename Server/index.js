const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const keys = require('./Config/keys')
const cors = require('cors')

require('./Models/Products');
require('./Models/Sales');


const app = express();

app.use(cors({
	methods:['GET','POST'],
	credentials: true,
	origin: '*',
  }))



mongoose.connect(keys.mongoURI);

// On Connection
mongoose.connection.on('connected', () => {
	console.log('Connected to database ');
});

// On Error
mongoose.connection.on('error', err => {
	console.log('Database error: ' + err);
});

// app.use(cookieParser('anything')) 

// app.use(session({ 
// secret: 'super secret',
// resave: false,
// saveUninitialized: false,
// maxAge: 30 * 24 * 60 * 60 * 1000, //30 days

// }));

 //Must inorder to receive post request in req.body object
 app.use(express.static(__dirname));
 app.use(bodyParser.json({limit: '50mb'}));
 app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));



// app.use((req, res, next) => {
//     res.locals.user = req.user;
//     next();
// });

//authRoute return a function with app (express app) argument
require('./Routes/StoreRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);