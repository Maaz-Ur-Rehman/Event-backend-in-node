const connectDB = require('../src/config/config');
const userRoutes = require('./routes/userroutes');


const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const app = express();

// var http = require('http').Server(app);
// Parse environment variables

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.options('*', cors());
// Routes
// app.use('/', userRoutes);
app.use((req, res, next) => {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", "0");
  next();
});
app.use('/api/user', userRoutes);
app.get("/", (req, res) => {
  res.send("Hello Matz Events!");
});

connectDB();

module.exports = app;

  /*
app.use((req, res, next) => {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", "0");
  next();
});

app.use("/api/spade", userRoutes);
connect();
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
  */
