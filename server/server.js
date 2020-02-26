const express = require('express');
const cors = require('cors');
const axios = require('axios');
// const urlFile = require('./url.js');
// const mongo = require('./mongo.js');

const app = express();
const port = process.env.PORT || 4545;
const url = process.env.API_URL; // || urlFile;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// app.get(`/local`, (req, res) => {
//   mongo.find({}).toArray((err, items) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(items);
//     }
//   });
// });

app.get('/api', (req, res) => {
  axios
    .get(url)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => res.send(err));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
