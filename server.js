const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

mongoose.connect(`mongodb://localhost:27017/recipe`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

const Recipe = require('./models/recipe.js');

// listening
app.listen(PORT, () =>{
    console.log('listening on port ' + PORT);
});