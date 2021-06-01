const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const Recipe = require('../models/recipe.js');

// routes
router.get('/', (req, res) => {
    Recipe.find({}, (error, allRecipes)=>{
        if (error) {
            res.send(error)
        } else {
            res.render('index.ejs', { recipe: allRecipes });
        }
    });
})


// new
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

// create
router.post('/', (req, res) => {
    Recipe.create(req.body, (error, createdRecipe) => {
        res.redirect('/recipe')
    })
})

//show 
router.get(`/:id`, (req, res) => {
    Recipe.findById(req.params.id, (error, foundRecipe) => {
        res.render(`show.ejs`, {
            recipe: foundRecipe
        })
    })
});

// delete
router.delete(`/:id`, (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (error, deletedRecipe)=>{
        res.redirect('/recipe');
    });
})

// EDIT SHOW
router.get(`/:id/edit`, (req, res) => {
    Recipe.findById(req.params.id, (error, foundRecipe) => {
        res.render('edit.ejs', {
            recipe: foundRecipe
        })
  })
});

// edit 
router.put('/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedModel) => {
        res.redirect(`/recipe/${req.params.id}`);
    });
});

module.exports = router;