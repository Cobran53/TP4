'use strict';

// import du module Express
let express = require('express');
let app = express();

let db = require('./data/db.json');

app.get('/genres', (req, res) => {
    const json = JSON.stringify(db['genres']);
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.send(json);
});

app.get('/genres/:genre/artists', (req, res) => {
    let artists = db['artists'].filter((artist) => artist['genreId'] === req.params['genre']);
    if (artists.length !== 0) {
        res.json(artists);
    }
    else {
        res.status(404).send('Genre non trouvé T_T');
    }
});

//  app.get()

// export de notre application vers le serveur principal
module.exports = app;
