const axios = require('axios');

const getRecipePuppyData = async (keywords) => {
    const recipePuppyApiUrl = `http://www.recipepuppy.com/api/?i=${keywords.join(',')}&p=3`;
    //get results from third page (p=3) because first and second page recipes are too simple, with few ingredients.
    //console.log("*** RecipeController.recipePuppyApiUrl", recipePuppyApiUrl);

    let recipePuppyResponse;

    try {
        recipePuppyResponse = await axios.get(recipePuppyApiUrl);
    } catch (error) {
        return res.json({
            message: "Error during HTTP request of Recipe Puppy API.",
            metadata: error
        })
    }

    const recipePuppyData = recipePuppyResponse.data;
    //console.log("*** RecipeHelper.getRecipePuppyData.recipePuppyData", recipePuppyData);

    const recipePuppyResults = recipePuppyData.results;
    return recipePuppyResults;
}


const getGIPHYData = async (recipesResults) => {
    const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
    const promises = recipesResults.map(async (recipe) => {
        const title = recipe.title.trim(); 
        const ingredients = recipe.ingredients
            .split(',')
            .map(i => i.trim())
            .sort();
        const link = recipe.href;

        const GIPHYUrl = `http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${title}`
        
        let GIPHYResponse;

        try {
            GIPHYResponse = await axios.get(GIPHYUrl);             
        } catch (error) {
            return {
                message: "Error during HTTP request of GIPHY API.",
                metadata: error
            };
        }

        const GIPHYData = GIPHYResponse.data;
        //console.log("*** RecipeHelper.getGIPHYData.GIPHYData", GIPHYData);

        const gif = GIPHYData.data[0].images.original.url;
        //console.log("*** RecipeHelper.getGIPHYData.thumbnail", thumbnail);            

        return {
            title,
            ingredients,
            link,
            gif
        }
    });
    return Promise.all(promises);
}

module.exports = { getRecipePuppyData, getGIPHYData };