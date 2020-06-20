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
    level: { type: Number, default: 0 },
    email: { type: String, required: true, unique: true, }
})

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: [String], required: true},
    mainCasting: { type: [String], requried: true },
    casting: { type: [String], required: true},
    year: { type: Date,  required: true },
    score: { type: Number, required:true, default: 0 },
    likes: { type: [String], default: [], unique: true },
    dislikes: { type: [String], default: [], unique: true },
    runningTime: { type: Number, required: true },
    degree: { type: Number, required: true }
})

module.exports = {
    connectDB,
    user: mongoose.model('user', userSchema),     
    movie: mongoose.model('movie', movieSchema)
}