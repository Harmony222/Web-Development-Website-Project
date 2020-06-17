var express = require('express');
var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');
var bodyParser = require('body-parser');

var fs = require('fs');
var data = fs.readFileSync('public/plantInfo.json', 'utf8');
var plantData = JSON.parse(data);

var app = express();
var hbs = exphbs.create({defaultLayout:'main'})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('port', 23566);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.render('home', {active: {home: true}});
});

app.get('/education', function(req, res) {
    res.render('education', {active: {education: true}});
});

app.get('/purchase', function(req, res) {
    res.render('purchase', {active: {purchase: true}, data: plantData});
});

app.get('/exchange', function(req, res) {
    res.render('exchange', {active: {exchange: true}, data: plantData});
});

app.post('/newplant', function(req, res) {
    var newData = req.body;
    plantData.push(newData);
    json = JSON.stringify(plantData);
    fs.writeFile('public/plantInfoTest.json', json, 'utf8', function(err) {
        if (err) console.log(err);
    });
    res.redirect(302, 'purchase')
})

app.use(function(req,res){
    res.status(404);
    res.render('404');
});
  
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(process.env.PORT || app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

Handlebars.registerHelper('trimString', function(fullString) {
    var shortString = fullString.substring(0,50);
    var cleanString = shortString.replace( /(<([^>]+)>)/ig, '');
    return new Handlebars.SafeString(cleanString);
})
