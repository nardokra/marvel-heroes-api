require('dotenv').config();
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var logger = require('morgan');
var MongoStore = require("connect-mongo")(session);
var app = express();
var localhost = process.env.PORT;
var cors = require('cors');

app.use(cors({
    origin: [process.env.client_origin_a, process.env.client_origin_b],
    credentials: true,
    exposedHeaders: 'Authorization'
}));

mongoose
  .connect(process.env.CONNECTIONPASSWORD, {
    useNewUrlParser: true,  
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

// To fix the DeprecationWarning
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

app.use('/', require('./routes/index'));
app.use('/', require('./routes/getAllHeroeDocuments'));
app.use('/', require('./routes/postAddHeroeDocument'));
app.use('/', require('./routes/postEditHeroeDocument'));
app.use('/', require('./routes/postRemoveHeroeDocument'));

module.exports = app;
// app.listen(localhost, () => console.log(`App listening on ${localhost}`))

