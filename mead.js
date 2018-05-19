var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var fortune = require('./lib/fortune.js');





app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

app.set('port', process.env.PORT || 3000)

app.use(express.static(__dirname + '/public'))

app.get('/', function(req,res){
    res.render('home');
});

app.get('/about', function(req, res){
    res.render('about', {fortune: fortune.getFortune() } );
});


// пользовательская страница 404
app.use(function(reg, res, next){
    res.status(404);
    res.send('404');
});

// пользовательская страница 500
app.use(function(err, reg, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500');
});

app.listen(app.get('port'), function(){
    console.log( 'Express запущен на http://localhost:' +      app.get('port') + '; нажмите Ctrl+C для завершения.' ); })








