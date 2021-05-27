const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    inspiration: { type: String, required: true },
    img: String,
    ingredients: { type: String, required: true },
    cooking: { type: String, required: true }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;