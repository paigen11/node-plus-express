const express = require('express');

const app = express();
const port = 5000;

//Express starts these up before any of our routes do
app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function(req, res){
    res.send('Hello world');
});

app.get('/books', function(req, res){
    res.send('Hello books');
});

app.listen(port, function(err){
    console.log('Running server on port: ', port);
});