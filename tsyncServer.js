var express = require('express');
var timesyncServer = require('timesync/server');

// create an express app
var port = 8081;
var app = express();

app.use(express.static('public'));

// serve static index.html
app.get('/tsyncClient.html', express.static(__dirname));

// handle timesync requests
app.use('/timesync', timesyncServer.requestHandler);

app.listen(port);
console.log('Server listening at http://localhost:' + port);
