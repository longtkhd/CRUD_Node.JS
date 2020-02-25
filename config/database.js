const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud', { 
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});