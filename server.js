const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const workoutAPI = require('./src/api/WorkoutApi');
const workoutUseryAPI = require('./src/api/WorkoutUserApi ');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true

}, (error) => {
  if (error) {
    console.log('Database Error: ', error.message);
  }
});

mongoose.connection.once('open', () => {
  console.log('Database Connected');
});

app.use('/workout', workoutAPI());
app.use('/workoutUser', workoutUseryAPI());

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});