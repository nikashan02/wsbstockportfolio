const express = require("express");
const app = express();
const port = process.env.PORT || 5000
const cors = require("cors");
const path = require('path');

const posts = require('./posts')

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', posts);

app.listen(port, () => console.log(`Listening on port ${port}!`));