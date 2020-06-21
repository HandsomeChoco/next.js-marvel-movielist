const mongoose = require('mongoose');

const connectDB = mongoose.connect('mongodb://localhost:27017/NextApp',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, minlength: 5, maxlength: 16, unique: true, trim: true },
    password: { type: String, required: true },
    birthDay: { type: Date },
    role: { type: String, default: 'visitor', required: true,  enum: ['visitor', 'member', 'step', 'admin'] },
    email: { type: String, required: true, unique: true, match : /.+\@.+@..+/ },
    name: { type: String, required: true, },
    nickName: { type: String, required: true, minlength: 3, maxlength: 16 },
    createdAt: { type: Date, required: true, default: Date.now() },
    updatedAt: { type: Date, required: true, default: Date.now() },
    age: { type: Number, min: 0, max: 200 }
})

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: [String], required: true},
    mainCasting: { type: [String], requried: true },
    casting: { type: [String], required: true},
    year: { type: Date,  required: true },
    score: { type: Number, required:true, default: 0 },
    like: { type: [String], default: [] },
    dislike: { type: [String], default: [] },
    runningTime: { type: Number, required: true },
    degree: { type: Number, required: true }
})

module.exports = {
    connectDB,
    user: mongoose.model('user', userSchema),     
    movie: mongoose.model('movie', movieSchema)
}