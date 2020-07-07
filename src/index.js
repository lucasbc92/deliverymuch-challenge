const express = require('express');
const recipeController = require('./controllers/recipe');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(recipeController);

app.listen(3003, () => {
    console.log('Listening on port 3003');
});