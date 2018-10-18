var express = require('express');
var app = express();
var cors = require('cors');
var superagent = require('superagent');
var server;

app.use(cors());

async function getPageSource(url) {
    var result = await superagent.get(url)
    return result.text;
}

app.get('/page_source', async function(req, res) {
    if (!req.query.url || req.query.url == "") {
        res.status(400).send("url request parameter is not sent.");
    }
    source = await getPageSource(req.query.url);
    res.status(200).send(source);
});

function startServer(port) {
    var port = Number(process.env.PORT || port);
    server = app.listen(port);
}

function stopServer() {
    server.close();
}

startServer(8000);