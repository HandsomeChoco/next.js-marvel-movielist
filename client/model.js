var mongoose = require('mongoose');
var moment = require('moment');

var connectDB = function() {
  mongoose.connect('mongodb://localhost:27017/NextApp', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: true,
  });
} 

var userSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true,  
    trim: true, 
    index: true,
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
    index: true, 
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
});

var movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: [String], required: true },
  casting: { type: [String], required: true },
  year: { type: Date, required: true, default: moment().format('YYYY') },
  score: { type: Number, default: 0 },
  likes: { type: Number, default: 0, index: true },
  dislikes: { type: Number, default: 0, index: true },
  runningTime: { type: Number, required: true }
});

var actorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  heroName: String,
})

module.exports = {
    connectDB,
    Users: mongoose.model('Users', userSchema),
    Movies: mongoose.model('Movies', movieSchema),
    Actor: mongoose.model('Actor', actorSchema)
}