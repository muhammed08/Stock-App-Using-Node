const express = require('express');
const app = express();
var exphbs  = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

//set Hanldebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//set hanlebar routes
app.get('/', function (req, res) {
    res.render('home',{
    	stuff: "nahh...i am kidding"
    });
});

//create a static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT);