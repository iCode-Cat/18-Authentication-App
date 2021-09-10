const mongoose = require('mongoose');
const moment = require('moment');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  profile_img: {
    type: String,
    default:
      'https://www.pngarea.com/pngm/676/4747761_default-image-png-default-profile-picture-transparent-hd.png',
  },
  createdAt: {
    type: String,
    default: () => moment().format('MM/DD/HH:mm'),
  },
  lastLogin: {
    type: String,
    default: () => moment().format('MM/DD/HH:mm'),
  },
});

module.exports = User = mongoose.model('user', UserSchema);
