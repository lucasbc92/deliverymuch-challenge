const express = require('express');
const cors = require('cors');
const recipeController = require('./controllers/recipe');


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/recipes',recipeController);

app.listen(3003, () => {
    console.log('Listening on port 3003');
});