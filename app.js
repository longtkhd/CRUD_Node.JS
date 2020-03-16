const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require ('./config/database');

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//router
const router = require('./Routers/api.router');
app.use(router);
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.listen(port,() => {
  console.log('sever is running on port ' + port);
})

// const jwt = require('jsonwebtoken');
// const myFunction = async() => {
//   const token = jwt.sign({_id: 'abc123'},'abc',{expiresIn:'7 days'});
//   const data = jwt.verify(token,'abc');
//   console.log(data);
//   console.log(token);
// }
// myFunction();