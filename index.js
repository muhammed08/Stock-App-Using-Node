const express = require('express');
const app = express();
var exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const PORT = process.env.PORT || 5000;
const bodyPareser = require('body-parser');


app.use(bodyPareser.urlencoded({extended: false}));

//API KEY pk_1d693e4af3554274a98213aa368574ac

function call_api(finishedAPI,ticker){
	request('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=pk_1d693e4af3554274a98213aa368574ac', { json: true } , (err,res,body) => {
		if (err){return console.log(err)}
		if(res.statusCode === 200){
			finishedAPI(body);
		};
	});
};
//set Hanldebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//set GET hanlebar routes
app.get('/', function (req, res) {
	call_api(function(body) {
			res.render('home',{
    		stock : body
    	});

	},'fb');
    
});

//set POST hanlebar routes
app.post('/', function (req, res) {

	call_api(function(body) {

			res.render('home',{
    		stock : body
    	});

	},req.body.stock_ticker);
    
});

//About page
app.get('/about.html', function (req, res) {
    res.render('about');
});

//create a static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT);