const express = require('express');

const router = express.Router();

const { getRecipePuppyData, getGIPHYData } = require('../helpers/recipe');

require('dotenv').config();

router.get('/', async (req, res) => {
    const ingredients  = req.query.i ? req.query.i : ""; // get ingredients from query params

    const keywords = ingredients
        .toLowerCase() // lower case string characters for sorting 
        .split(",") // split ingredients string by comma into an array
        .slice(0,3) // get three first ingredients (the maximum number of ingredients are three)
        .map(i => i.trim()) // delete extra whitespaces
        .sort(); // and sort alphabetically

    //console.log("*** RecipeController.keywords", keywords);

    if (ingredients !== '') {
        const recipePuppyResults = await getRecipePuppyData(keywords);
        const recipesWithGif = await getGIPHYData(recipePuppyResults);
        
        return res.json({
            keywords,
            recipes: recipesWithGif,
        });
    } else return res.json({
        message: "Ingredients are required."
    })
});

module.exports = router;