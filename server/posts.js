const express = require('express');
const router = express.Router();

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

router.get("/getPosts", (req, res) => {
  res.send(responseTickerList);
});

module.exports = router;