const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 5000;
const nav = [{
    Link: '/Books',
    Text: 'Book'
}, {
    Link: '/Authors',
    Text: 'Author'
}];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

//Express starts these up before any of our routes do
app.use(express.static('public'));
app.set('views', './src/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//If Jade was our templating engine
// app.set('view engine', '.jade');

//If Handlebars was our templating engine
// const handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({extname: '.hbs'}));
// app.set('view engine', '.hbs');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res){
    res.render('index', {title: "Hello from render",
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

app.get('/books', function(req, res){
    res.send('Hello books');
});

app.listen(port, function(err){
    console.log('Running server on port: ', port);
});