// express server

const express = require('express');
const app = express();
const port = 8000;

app.get('/css/*', (req, res) => {
    res.sendFile(req.url, {root: './src/client'});
})

app.get('/js/*', (req, res) => {
    res.sendFile (req.url, {root: './src/client'});
})

app.get('/', (req, res) => {
    // return the index page from ../client
    res.sendFile('index.html', {root: './src/client'});
});

app.get('/api/topics', (req, res) => {
    res.sendFile('topics.json', {root: './src/server'});
})

app.get('/api/loadContent/:contentUri', (req, res) => {
    res.sendFile(req.params.contentUri, {root: './src/client/content'});
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });