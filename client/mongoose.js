const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    const KittySchema = new mongoose.Schema({
        name: String
    });

    // const silence = new Kitten({ name: 'Silence'});
    // console.log(silence.name);

    KittySchema.methods.speak = function() {
        const greeting = this.name ? `Meow name is ${this.name}` : `I don't have  a name`;
        console.log(greeting);
    }
    const Kitten = mongoose.model('Kitten', KittySchema);

    const fluffy = new Kitten({ name: 'fluffy' });
    fluffy.speak();

    fluffy.save(function (err, fluffy) {
        if(err) throw err;
        fluffy.speak();
    });
})