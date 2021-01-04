# The r/WallStreetBets Weekly Stock Portfolio

This React.js Express project (visible at [wsbstockportfolio.herokuapp.com](http://wsbstockportfolio.herokuapp.com/)) fetches the top posts from the [r/WallStreetBets](https://www.reddit.com/r/wallstreetbets/) subreddit from the past week using the Reddit API and creates a stock portfolio that updates every 20 minutes.

__REMINDER:__ This is __NOT__ a real stock portfolio and therefore are __NOT__ stock investment reccomendations! Please do your own research if something you see on this portfolio interests you.

### A couple notes:

- The first column can be clicked to expand the row and see the posts with information including the post title/link, upvotes, and price of the stock at the post creation date for each stock ticker in the 2nd column.

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g


## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ yarn install

## Configure app

Open `a/nice/path/to/a.file` then edit it with your settings. You will need:

- A setting;
- Another setting;
- One more setting;

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build
