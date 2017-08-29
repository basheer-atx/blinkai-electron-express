var path = require('path');
var express = require('express');
var app = express();

//app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, '/public/')));
// Setup Globally Included Directories
app.use(express.static(path.join(__dirname, '/../bower_components/')));
app.use(express.static(path.join(__dirname, '/../node_modules/')));
app.use(express.static(path.join(__dirname, '/../controllers/')));
//app.use(express.static(path.join(__dirname, '/../public/')));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


app.get('/dashboard', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/test', function (req, res) {
    res.sendFile(__dirname + '/public/test.html');
});

app.listen(3333);
