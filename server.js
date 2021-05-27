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

// routes
app.get('/', (req, res) => {
    res.send('hello from the cooking app')
})

// index
app.get('/recipe/', (req, res) => {
    Recipe.find({}, (error, allRecipes)=>{
        if (error) {
            res.send(error)
        } else {
            res.render('index.ejs', { recipe: allRecipes });
        }
    });
})

// new
app.get('/recipe/new', (req, res) => {
    res.render('new.ejs')
})

// create
app.post('/recipe', (req, res) => {
    Recipe.create(req.body, (error, createdRecipe) => {
        res.redirect('/recipe')
    })
})

//show 
app.get(`/recipe/:id`, (req, res) => {
    Recipe.findById(req.params.id, (error, foundRecipe) => {
        res.render(`show.ejs`, {
            recipe: foundRecipe
        })
    })
});

// listening
app.listen(PORT, () =>{
    console.log('listening on port ' + PORT);
});