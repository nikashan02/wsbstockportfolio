const express = require("express");
const app = express();
const port = process.env.PORT || 5000
const cors = require("cors");
const path = require('path');


app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend/build')));


let responseTickerList = {
                          "res": [{
                                    "stock": "",
                                    "shares": 0,
                                    "sentiment": 0,
                                    "avg_cost": "$0",
                                    "total_return": "0%",
                                    "curr_price": "",
                                    "posts": [
                                              {
                                                  "title": "",
                                                  "upvotes": 0,
                                                  "url": "",
                                                  "created": "",
                                                  "historical": 0
                                              }
                                            ]
                                  }]
                        };

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