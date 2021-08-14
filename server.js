const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const StockCategoryAPI = require('./src/api/StockCategoryApi');
const StockCategoryItemAPI=require('./src/api/StockItemsApi');
const SuppliersAPI=require('./src/api/SuppliersApi');

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

app.use('/StockCategory', StockCategoryAPI());
app.use('/StockCategoryItem', StockCategoryItemAPI());
app.use('/Suppliers', SuppliersAPI());
app.use(bodyParser.json({ limit:"30mb",extended: true}));
app.use(bodyParser.urlencoded({ limit:"30mb",extended: true}));


mongoose.connection.once('open', () => {
  console.log('Database Connected');
});

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});
