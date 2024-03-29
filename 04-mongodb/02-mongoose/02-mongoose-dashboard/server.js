// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 8000;

// Create express app
const app = express();

// Use bodyParser to parse form data sent via HTTP POST
app.use(bodyParser.urlencoded({ extended: true }));

// Tell server where views are and what templating engine I'm using
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Create connection to database
const connection = mongoose.connect("mongodb://localhost/chicken_db", { useNewUrlParser: true });

// Create dog schema and attach it as a model to our database
const ChickenSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  color: String
});

// Mongoose automatically looks for the plural version of your model name, so a Dog model in Mongoose looks for 'dogs' in Mongo.
const Chicken = mongoose.model('Chicken', ChickenSchema);

// Routes go here!
app.get('/', function (req, res) {
  Chicken.find({}, function (err, results) {
    if (err) { console.log(err); }
    res.render('index', { chickens: results });
  });
});

// Create
app.post('/', function (req, res) {
  // Create a new dog!
  Chicken.create(req.body, function (err, result) {
    if (err) { console.log(err); }
    res.redirect('/')
  });
});

// New
app.get('/new', function (req, res) {
  res.render('new');
});

// // Show
// app.get('/:id', function (req, res) {
//   Chicken.find({ _id: req.params.id }, function (err, response) {
//     if (err) { console.log(err); }
//     res.render('show', { chicken: response[0] });
//   });
// });

// app.get('/:id/edit/', function (req, res) {
//   Chicken.find({ _id: req.params.id }, function (err, response) {
//     if (err) { console.log(err); }
//     res.render('edit', { chicken: response[0] });
//   })
// });

// // Update
// app.post('/:id', function (req, res) {
//   Chicken.update({ _id: req.params.id }, req.body, function (err, result) {
//     if (err) { console.log(err); }
//     res.redirect('/');
//   });
// });

// // Delete
// app.post('/:id/delete', function (req, res) {
//   Chicken.remove({ _id: req.params.id }, function (err, result) {
//     if (err) { console.log(err); }
//     res.redirect('/');
//   });
// });


app.listen(port, function () {
  console.log("Running on ", port);
});
