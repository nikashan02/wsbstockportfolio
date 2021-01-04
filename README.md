# The r/WallStreetBets Weekly Stock Portfolio

This React.js Express project (visible at [wsbstockportfolio.herokuapp.com](http://wsbstockportfolio.herokuapp.com/)) fetches the top 100 posts from the [r/WallStreetBets](https://www.reddit.com/r/wallstreetbets/) subreddit from the past week with the "DD" flair using the Reddit API and creates a stock portfolio with the 30 most commonly mentioned stock tickers. The portfolio is updated every 20 minutes.

__REMINDER:__ This is __NOT__ a real stock portfolio and therefore are __NOT__ stock investment reccomendations! Please do your own research if something you see on this portfolio interests you.

### A couple notes:

- The first column can be clicked to expand the row and see the posts with information including the post title/link, upvotes, and price of the stock at the post creation date for each stock ticker in the 2nd column.
- The third column, "Shares", is the number of shares for each ticker which is calculated by summing all the points from each post.
- The fourth column, "Sentiment", is the positivity rating of the stock according to the the subreddit which is calulated by the average of the sentiment for each post with the matching ticker. The setniment is calulated using Natural Language Proccessing (NLP).
- The fifth column, "Average Cost", 

![Screenshot](https://github.com/nikashan02/wsbstockportfolio/blob/main/screenshot.png?raw=true)

## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node

- #### Node installation on MacOS

  Go on the [official Node.js website](https://nodejs.org/) and download the installer.

- #### Node installation on Windows

  Go on the [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.18.3

    $ npm --version
    6.14.7

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Install

    $ git clone https://github.com/nikashan02/wsbstockportfolio
    $ cd wsbstockportfolio
    $ npm install

## Configure app

Open `/.env_sample` then edit it with your settings and rename the file to `.env`. You will need:

- API_KEY → Place your [Tiingo](https://api.tiingo.com/) API token here which is neccessary to retrieve historical and current stock data.

## Running the project

    $ npm start
    $ cd frontend
    $ npm start

The express server will be running at http://localhost:5000 and the React frontend will be running at http://localhost:3000.
