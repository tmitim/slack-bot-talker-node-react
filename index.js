var express = require('express');
var slack = require('./slackBot');
var path = require('path');

var bodyParser = require('body-parser');

var app = express();

const port = 3000;

app.use('/', express.static(path.join(__dirname, './public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`listening to ${port}`);
});

app.post("/messages", (req, res) => {
  console.log(req.body.message)
  slack.message(req.body.message, function(result) {
    res.json(result);
  });
});