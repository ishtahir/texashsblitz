const express = require('express');
const mongo = require('./mongo.js');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4545;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/oneteam', (req, res) => {
  const school = req.query.school;
  mongo.findOne({ school }, (err, item) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(item);
  });
});

app.get('/all', (req, res) => {
  mongo.find({}).toArray((err, items) => {
    if (err) {
      res.send(err);
    } else {
      res.send(items);
    }
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
