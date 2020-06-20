var Mongoose = require('Mongoose');
var moment = require('moment');
var Schema = Mongoose.Schema;
var connection = new Mongoose.createConnection('mongodb://localhost:27017/NextApp', {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true, 
  useFindAndModify: true
});





var User = new Mongoose.model('User', new Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true,  
    trim: true, 
    minlength: 5, 
    maxlength: 16,
  },
  password: { 
    type: String, 
    required: true, 
    trim: true 
  }, 
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    unique: true, 
    match : /.+\@.+@..+/ 
  }, 
  role: {
    type: String,
    enum: ['admin', 'worker', 'customer'],
    required: true,
  },
  name: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: 2,
    maxlength: 16,
  },
  nickName: { 
    type: String, 
    required: true,
    unique: true,
  },
  sex: {
    type: String,
    required: true,
    enum: ['male', 'female', 'not selected'],
  },
  birthDay:  {
    type: Date,
    required: true,
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  age: { 
    type: Number, 
    min: 0, 
    max: 150 
  },
}));


var Movie = new Mongoose.model('Movie', new Schema({
  title: { type: String, required: true },
  director: { type: [String], required: true },
  casting: { type: [String], required: true },
  year: { type: Date, required: true, default: moment().format('YYYY') },
  score: { type: Number, default: 0 },
  likes: { type: [String] },
  dislikes: { type: [String] },
  runningTime: { type: Number, required: true }
}));

module.exports = {
  connection,
  User,
  Movie
}