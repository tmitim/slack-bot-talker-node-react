var express = require('express');

var app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`listening to ${port}`);
})

app.get("/", (req, res) => {
  res.json("hello world");
})