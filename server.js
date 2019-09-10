const express = require('express');
const app = express();
const fetch = require('node-fetch');
const http = require('http');

const base = 'https://api.themoviedb.org/3';
const api_key = process.env.API_KEY;
require('dotenv').config();

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

server.on("listening", () => {
    console.log(`server is listening for requests on port ${server.address().port}`);
});


// app.listen(3000, () => console.log('listening on port 3000!'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// Gets list of most popular shows to populate on homepage
app.get('/tv/popular', async(req, res) => {
    const tvPopularUrl = `${base}/tv/popular?api_key=${process.env.API_KEY}`
    const popularShowsResponse = await fetch(tvPopularUrl);
    const popularShowsJSON = await popularShowsResponse.json();
    res.json(popularShowsJSON);
});

// Gets results for show user has searched 
app.get('/search/tv/:tvShow', async(req, res) => {
    const queryString = req.params.tvShow.replace(" ", "%20");
    const showSearchUrl = `${base}/search/tv?api_key=${process.env.API_KEY}&query=${queryString}`
    const showSearchResponse = await fetch(showSearchUrl);
    console.log(showSearchResponse)
    const showSearchJSON = await showSearchResponse.json();
    res.json(showSearchJSON)
    console.log(showSearchJSON)
});

// Serves page to display show search results
app.get('/tv/:tv_id', async(req, res) => {
    res.sendFile(__dirname + "/public/show.html");
});

// Gets additional information on search results user has selected
app.get('/show/data/:showId', async(req, res) => {
    const showId = req.params.showId;
    const showInfoUrl = `${base}/tv/${showId}?api_key=${process.env.API_KEY}`;
    const showInfoResponse = await fetch(showInfoUrl);
    const showInfoJSON = await showInfoResponse.json();
    res.json(showInfoJSON);
})