const express = require("express");
const app = express();
const port = process.env.PORT || 5000
const cors = require("cors");
const path = require('path');


app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend/build')));


let responseTickerList = [];

const { fork } = require('child_process');
const forked = fork('child.js');

forked.send("Started child proccess");
forked.on('message', (msg) => {
  responseTickerList = msg;
});

app.get("/getPosts", (req, res) => {
  res.send(responseTickerList);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));