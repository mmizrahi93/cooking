const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const bcrypt = require('bcryptjs')

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ `recipe`;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

const recipeController = require('./controllers/recipe.js');
app.use('/recipe', recipeController);


// listening
app.listen(PORT, () =>{
    console.log('listening on port ' + PORT);
});