const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware')
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(
  '/api/reviews',
  proxy({
    target: 'http://localhost:3004',
    changeOrigin: true
  })
);
app.use('/', express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`I'm serving from http://localhost:${port}`);
});