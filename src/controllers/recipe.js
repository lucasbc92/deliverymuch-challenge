const express = require('express');
const axios = require('axios');
const router = express.Router();

const fetch = require('node-fetch');
const { response } = require('express');

require('dotenv').config();

router.get('/', async (req, res) => {
    const i  = req.query.i ? req.query.i : ""; // get ingredients from query params

    const keywords = i
        .toLowerCase() // lower case string characters for sorting 
        .split(",") // split ingredients string by comma into an array
        .map(i => i.trim()) // delete extra whitespaces
        .sort(); // and sort alphabetically;

    const recipePuppyApiUrl = `http://www.recipepuppy.com/api/?i=${keywords.join(',')}&p=3`;
    //get results from third page (p=3) because first and second page recipes are too simple, with few ingredients.

    //console.log("*** RecipeController.recipePuppyApiUrl", recipePuppyApiUrl);

    let recipePuppyResponse;

    try {
        recipePuppyResponse = await axios.get(recipePuppyApiUrl)
    } catch (error) {
        return res.json({
            message: "Error during request of Recipe Puppy API.",
            metadata: error
        })
    }
        const recipePuppyData = recipePuppyResponse.data;

        const results = recipePuppyData.results;
        const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

        const recipes = results.map(recipe => { 
            const title = recipe.title.trim(); 
            const ingredients = recipe.ingredients
                .split(',')
                .map(i => i.trim())
                .sort();
            const link = recipe.href;

            // const GIPHYUrl = `http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${title}`
            
            // let GIPHYResponse;

            // try {
            //     GIPHYResponse = await axios.get(GIPHYUrl);             
            // } catch (error) {
            //     return null;
            // }

            // const GIPHYData = GIPHYResponse.data;

            // //console.log("*** GIPHYData", GIPHYData);

            // const thumbnail = GIPHYData.data[0].images.original.url;
            // console.log("*** RecipeController.GIPHYData.thumbnail", thumbnail);            

            return {
                title,
                ingredients,
                link,
                //thumbnail
            }
        });

        return res.json({
            keywords,
            recipes,
        });

    

    // const recipes = fetch(recipePuppyApiUrl)
    //     .then(recipePuppyResponse => {
    //         if (recipePuppyResponse.status === 200) {
    //             const responseJson = recipePuppyResponse.json();
    //             return responseJson;
    //         } else return recipePuppyResponse.status;
    //     })
    //     .then(recipePuppyData => {
    //          //console.log("*** RecipeController.recipePuppyData", recipePuppyData);

    //          const results = recipePuppyData.results;
    //          const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

    //          const recipes = results.map(recipe => { 
    //             const title = recipe.title.trim(); 
    //             const ingredients = recipe.ingredients
    //                 .split(',')
    //                 .map(i => i.trim())
    //                 .sort();
    //             const link = recipe.href;

    //             return {
    //                 title,
    //                 ingredients,
    //                 link,
    //             }
    //          });

    //         console.log("*** RecipeController.recipes", recipes);

    //         const gifs = recipes.map(recipe => {
    //             fetch(`http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${recipe.title}`)
    //             .then(GIPHYResponse => {
    //                 if (GIPHYResponse.status === 200) {
    //                     const responseJson = GIPHYResponse.json();
    //                     return responseJson;
    //                 } else return GIPHYResponse.status;
    //             })
    //             .then(GIPHYData => {
    //                 const thumbnail = GIPHYData.data[0].images.original.url;
    //                 console.log("*** RecipeController.GIPHYData", thumbnail);

    //                 return thumbnail;                    
    //             })
    //             .catch(err => console.log(err) );
    //          })  
             
    //          console.log("*** RecipeController.gifs", gifs);
             
    //     })
    //     .catch(err => console.log(err) );

    //     return res.json({
    //         keywords,
    //         recipes,
    //     });
});

module.exports = router;