process.on('message', (msg) => {
  console.log(msg);
});

setInterval(() => {

  let myPromise = new Promise((resolve, reject) => {
    console.log("started");
    let tickerList = [];
    let postList = [];
    search(flair, sortBy, timeFrame).then(posts => {
      let count = 0;
      (async () => {
        for (var p=0; p<posts.length; p++) {
          let gotComments = await fetch(`https://www.reddit.com/r/wallstreetbets/comments/${posts[p].id}.json`)
                                    .then(res => res.json())
                                    .then(data => data[1].data.children.map(data => data.data))
                                    .catch(err => console.log(err))
          
          postList.push([posts[p].id, posts[p].title, gotComments, posts[p].selftext, posts[p].score, posts[p].url, "", 0, epochToDate(posts[p].created), 0]); // historical price
          count++;

          if (count === 100) {
            for (var i=0; i<postList.length; i++) {
              postList[i][6]=frequentTicker(postList[i]);
            }
            var Sentiment = require('sentiment');
            var sentiment = new Sentiment();
            for (var i=0; i<postList.length; i++) {
              var sentimentScore = 0;
              postList[i][2].forEach(comment => {
                sentimentScore += sentiment.analyze(comment.body).score;
              })
              postList[i][7] = sentimentScore;
            }
            (async () => {
              for (var i=0; i<postList.length; i++) {
                var dateList = postList[i][8].split("-");
                var startDate = `${parseInt(dateList[0])-1}-${dateList[1]}-${dateList[2]}`;
                var endDate = `${dateList[0]}-${dateList[1]}-${dateList[2]}`;
                let historical = await fetch(`https://api.tiingo.com/tiingo/daily/${postList[i][6]}/prices?startDate=${startDate}&endDate=${endDate}&token=${APIToken}`)
                                    .then(res => res.json())
                                    .then(data => data.pop().close)
                                    .catch(e => {
                                      console.log(startDate);
                                      console.log(endDate);
                                      console.log("");
                                    });
                
                postList[i][9] = historical;

                if (i===postList.length-1) {
                  tickerList = [[postList[0][6], postList[0][4], 0, 0, 0, 0, []]];
        
                  for (var x=1; x<postList.length; x++) {
                    if (postList[x][6] !== "") {
                      var found = false;
                      for (var y=0; y<tickerList.length; y++) {
                        if (postList[x][6] === tickerList[y][0]) {
                          found = true;
                          tickerList[y][1] += postList[x][4];
                          break;
                        }
                      };
                      if (found === false) {
                        tickerList.push([postList[x][6], postList[x][4], 0, 0, 0, 0, []]);
                      }
                    }
                  }
                                

                  for (var x=0; x<postList.length; x++) {
                    if (postList[x][6] !== "") {
        
                      for (var y=0; y<tickerList.length; y++) {
                        if (postList[x][6] === tickerList[y][0]) {
                          tickerList[y][2] += (postList[x][7]*postList[x][4])/tickerList[y][1];
                          tickerList[y][3] += (postList[x][9]*postList[x][4])/tickerList[y][1];
                          break;
                        }
                      }
                    }
                  }

                  for (var x=0; x<tickerList.length; x++) {
                    tickerList[x][2] = parseFloat(tickerList[x][2].toFixed(0));
                    tickerList[x][3] = parseFloat(tickerList[x][3].toFixed(2));
                  }
                  
                  (async () => {
                    for (var x=0; x<tickerList.length; x++) {
                      var currentStock = await fetch(`https://api.tiingo.com/tiingo/daily/${tickerList[x][0]}/prices?token=${APIToken}`)
                                                .then(res => res.json())
                                                .then(data => data[0].close)
                                                .catch(err => console.log(err))
                                                
                      tickerList[x][5] = currentStock;
                      tickerList[x][4] = ((currentStock-tickerList[x][3])/tickerList[x][3])*100;
                      tickerList[x][4] = parseFloat(tickerList[x][4].toFixed(2));
                      
                      tickerList[x][3] = `$${tickerList[x][3]}`;
                      if (tickerList[x][4] === 0) {
                        tickerList[x][4] = `0.00%`;
                      } else if (tickerList[x][4] > 0) {
                        tickerList[x][4] = `+ ${tickerList[x][4]}%`;
                      } else {
                        tickerList[x][4] = `- ${tickerList[x][4]*-1}%`;
                      }
                      tickerList[x][5] = `$${tickerList[x][5]}`;
                      
                      for (var z=0; z<postList.length; z++) {
                        if (postList[z][6] !== "") {
                          if (postList[z][6] === tickerList[x][0]) {
                            tickerList[x][6].push({
                              "title": postList[z][1],
                              "upvotes": postList[z][4],
                              "url": postList[z][5],
                              "created": postList[z][8],
                              "historical": postList[z][9]
                            });
                          }
                        }
                      }

                      if (x === tickerList.length-1) {
                        tickerList.unshift(["stock", "shares", "sentiment", "avg_cost", "total_return", "curr_price", "posts"]);
                        tickerList = arrayToJSON(tickerList);
                        console.log("done");
                        resolve(tickerList);
                      }
        
                    }
                  })()
        
                }
        
              }
            })()
          }

        }
      })()
    });
  })

  myPromise.then((x) => {
    process.send({"res": x});
  })

}, 1000*60*20);

const fetch = require("node-fetch");
const tickers = require('./tickers');
require('dotenv').config();
const APIToken = process.env.API_KEY;

const flair = "DD";
const sortBy = "top";
const timeFrame = "week";

function frequentTicker(post) {
  var count = 0;
  var tickerDict = tickers.map(ticker => [ticker, 0]);
  var listOfWords = post[1].split(' ').concat(post[3].split(' '))
  listOfWords.forEach(word => {
    for (var i=0; i<tickerDict.length; i++) {
      if (word.toLowerCase() === tickerDict[i][0].toLowerCase() ||
          word.toLowerCase() === "$"+tickerDict[i][0].toLowerCase() ||
          word.toLowerCase() === "("+tickerDict[i][0].toLowerCase()+")" ||
          word.toLowerCase() === "($"+tickerDict[i][0].toLowerCase()+")" ||
          word.toLowerCase() === "["+tickerDict[i][0].toLowerCase()+"]" ||
          word.toLowerCase() === "[$"+tickerDict[i][0].toLowerCase()+"]") {
            tickerDict[i][1]++;
            break;
      }
    }
  })
  var max = 0;
  var mostFrequent = "";
  for (var i=0; i<tickerDict.length; i++) {
    if (tickerDict[i][1]>max) {
      max = tickerDict[i][1];
      mostFrequent = tickerDict[i][0];
    }
  }
  return mostFrequent;
}

function search(flair, sortBy, timeFrame) {
  return fetch(`https://www.reddit.com/r/wallstreetbets/search.json?q=flair%3A${flair}&restrict_sr=1&t=${timeFrame}&sort=${sortBy}&limit=100`)
    .then(res => res.json())
    .then(data => data.data.children.map(data => data.data))
    .catch(err => console.log(err))
}

function epochToDate(epoch) {
  var date = new Date(epoch*1000);
  return date.toISOString().split("T")[0];
}

function arrayToJSON(arr){

  var keys = arr[0];

  var newArr = arr.slice(1, arr.length);

  var formatted = [],
  data = newArr,
  cols = keys,
  l = cols.length;
  for (var i=0; i<data.length; i++) {
          var d = data[i],
                  o = {};
          for (var j=0; j<l; j++)
                  o[cols[j]] = d[j];
          formatted.push(o);
  }
  return formatted;
}