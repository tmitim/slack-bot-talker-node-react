var express = require('express');
var slack = require('./slackBot');

var app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`listening to ${port}`);
});

app.get("/test", (req, res) => {
  slack.message("HELLO WORLD", function(result) {
    res.json(result);
  });
});