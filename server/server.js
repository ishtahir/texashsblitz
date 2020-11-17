const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes.js');

const app = express();
const port = process.env.PORT || 4545;

dotenv.config();

mongoose
  .connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch(() => console.log("COULD NOT CONNECT TO MONGO ATLAS!"));


app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use('/api', routes);

app.listen(port, () => console.log(`Server running on port ${port}`));
