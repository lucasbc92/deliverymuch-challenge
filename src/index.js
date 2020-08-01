const path = require('path');
const express = require('express');
const recipeController = require('./controllers/recipe');

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/', express.static(path.join(__dirname, 'testheroku')));

app.use('/recipes',recipeController);

app.listen(port, () => {
    console.log('Listening on port '+port);
});