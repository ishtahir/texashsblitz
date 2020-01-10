const express = require('express');
const cors = require('cors');
const axios = require('axios');
// const mongo = require('./mongo.js');

const app = express();
const port = process.env.PORT || 4545;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// app.get('/oneteam', (req, res) => {
//   const school = req.query.school;
//   mongo.findOne({ school }, (err, item) => {
//     if (err) {
//       res.send(err);
//       return;
//     }
//     res.send(item);
//   });
// });

// app.get('/all', (req, res) => {
//   mongo.find({}).toArray((err, items) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(items);
//     }
//   });
// });

app.get('/load', (req, res) => {
  axios
    .get('https://txhsfb.s3.us-east-2.amazonaws.com/2019-6a.json')
    .then(response => {
      console.log(response);
      res.send(response.data);
    })
    .catch(err => res.send(err));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
