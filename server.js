const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const emoji_regex = require('emoji-regex');
const { spawn } = require('child_process');
const { createHash, checkPassword, findUserByEmail, createUser } = require('./users');

app.use(cors());
app.use(express.json());

let spans = [];
let lotCounts = [];
let spotsTaken = [2484, 1339, 3221, 1992, 800];
let updateTime = [];
let ind = 3;

axios.get('https://parking.fullerton.edu/ParkingLotCounts/mobile.aspx')
 .then(res => {
    const htmlData = res.data;
    const $ = cheerio.load(htmlData);

    function getLotCount() {
      $('span', htmlData).each((index, element) => {
        const span = $(element).text();
        spans.push(span);
      });

      updateTime.push(spans[2]);
      while (ind <= 20) {
        lotCounts.push(spans[ind]);
        ind = ind + 4;
      }
      console.log(updateTime);
      console.log(lotCounts);
      return lotCounts;
    }
    
    const data = getLotCount();
    // You can now use the data variable to return the result
    // or store it in a database, or do whatever you need
  })
 .catch(err => console.error(err));

// Define a route for the /api/parking endpoint
app.get('/api/parking', (req, res) => {
  res.json(lotCounts);
});

// Define a route for the /api/spots-taken endpoint
app.get('/api/spots-taken', (req, res) => {
  // TODO: Fetch spots taken data from the API and return it as JSON 
  let i = 0
  while(i < 4){
    spotsTaken[i] = spotsTaken[i] - lotCounts[i]
    i++
  }
  console.log(spotsTaken);
  res.json(spotsTaken);
});

// Serve the static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root URL
app.get('/', (_req, res) => {
  // Send the "index.html" file as the response
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});