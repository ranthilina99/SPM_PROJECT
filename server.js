const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const StockCategoryAPI = require('./src/api/StockCategoryApi');
const StockCategoryItemAPI=require('./src/api/StockItemsApi');
const workoutAPI = require('./src/api/WorkoutApi');
const workoutUserAPI = require('./src/api/WorkoutUserApi');
const SuppliersAPI=require('./src/api/SuppliersApi');
const fileUpload = require('express-fileupload');
const userAPI=require('./src/api/UserAPI');
const storeAPI = require('./src/api/store.api');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles:true
}))

app.use(bodyParser.json({ limit:"120mb",extended: true}));
app.use(bodyParser.urlencoded({ limit:"120mb",extended: true}));
app.set('trust proxy', 1) // trust first proxy

app.use('/users', userAPI());
app.use('/StockCategory', StockCategoryAPI());
app.use('/StockCategoryItem', StockCategoryItemAPI());
app.use('/Suppliers', SuppliersAPI());
app.use('/workout', workoutAPI());
app.use('/workoutUser', workoutUserAPI());
app.use('/store', storeAPI());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
      console.log('Database Connection is ready...');
      //Server
      app.listen(process.env.PORT, () => {
          console.log(`server is running http://localhost:${process.env.PORT}`);
      })
  })
  .catch((err) => {
      console.log(err);
  })
