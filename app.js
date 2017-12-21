var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.post('/getResource', function (req, res) {
    console.log("Your POST request:" + req.body.toString());
    res.setHeader('Content-Type', 'application/json');
    res.send({
        status: "New",
        date: "19:00MSK 13.12.2017"
    });
});


app.get('/createTicket', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});
app.post('/createTicket', function (req, res) {
    res.sendfile(__dirname + '/public/blocks/clientForm.html');
});



app.post('/contacts', function (req, res) {
    console.log("Your GET request:" + req.body.toString());
    res.setHeader('Content-Type', 'application/json');
    res.send({location: "contacts.html", pageName: "Contacts"});
});

app.get('/', function(req,res){
    res.sendfile(__dirname + '/public/index.html');
});

app.post('/', function(req,res){
    res.sendfile(__dirname + '/public/blocks/navigation.html');
});

app.get('/blocks/clientForm.html', function(req,res){
    res.sendfile(__dirname + '/public/blocks/clientForm.html');
});
app.get('/javascripts/main.js', function(req,res){
    res.sendfile(__dirname + '/public/javascripts/main.js');
});

app.get('/stylesheets/main.less', function(req,res){
    res.sendfile(__dirname + '/public/stylesheets/main.less');
});
app.listen(3000, function () {
    console.log('Listening on port 3000...');
});

module.exports = app;
