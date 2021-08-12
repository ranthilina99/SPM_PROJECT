const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const storeAPI = require('./src/api/store.api');
const fileUpload = require('express-fileupload');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles:true
}))
app.use(bodyParser.json({ limit:"30mb",extended: true}));
app.use(bodyParser.urlencoded({ limit:"30mb",extended: true}));

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

app.route('/').get((req, res) => {
  res.send('SLIIT AF FINAL API BY SE2021 BATCH');
});

app.use('/store', storeAPI());

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});