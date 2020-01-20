const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

var {pcGames} = require('./public/js/home');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
        websiteHeading: 'GAME BLOGS',
        welcomeMessage: 'Welcome to Game Blogs',
        image: pcGames,
        // tag: homeimageassets.imgTag
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        websiteHeading: 'GAME BLOGS',
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs',{
        websiteHeading: 'GAME BLOGS',
        message: 'Portfolio page here.'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
