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