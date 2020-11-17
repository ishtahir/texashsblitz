const mongoose = require('mongoose');
mongoose.set('debug', true);

const teamSchema = new mongoose.Schema({
  city: String,
  school: {
    type: String,
    required: true,
  },
  mascot: {
    type: String,
    required: true,
  },
  enrollment: {
    type: Number,
    required: true,
  },
  class: {
    type: Number,
    required: true,
  },
  district: {
    type: Number,
    required: true,
  },
  division: {
    type: Number,
    required: true,
  },
  championships: {
    type: Array,
    required: true,
  },
  stateAppearances: {
    type: Array,
    required: true,
  },
  colors: {
    type: Array,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
});

const Team = mongoose.model('Team', teamSchema, 'txhsfb20');

module.exports = Team;
