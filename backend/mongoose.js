const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    const kittySchema = new mongoose.Schema({
        name: String
    });

    kittySchema.methods.speak = function() {
        const greeting = this.name ? `Meow name is ${this.name}` : `I don't have a name`;
        console.log(greeting);
    }
    const Kitten = mongoose.model('Kitten', kittySchema);
    const silence = new Kitten({ name: 'Silence'});
    silence.save(function (err, silence) {
        if(err) return console.error(err)
        silence.speak();
    })

    const fluffy = new Kitten({ name: 'fluffy' });
    fluffy.save(function (err, fluffy) {
        if(err) return console.error(err)
        fluffy.speak();
    });

    Kitten.find({ name: /^fluffy/ },function (err, kittens) {
        if(err) return console.error(err);
        console.log(kittens)
    })
    
})