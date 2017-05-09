//set PATH=%PATH%;C:\Users\smahara\AppData\Roaming\npm;

//Packages
var express 	= require('express');
var app 		= express();
var port 		= process.env.PORT || 3000;
var morgan 		= require('morgan');
var mongoose 	= require('mongoose');
//var User 		= require('./app/models/user');
var bodyParser 	= require('body-parser');
var router 		= express.Router();
var appRoutes 	= require('./app/routes/api')(router);
var path 		= require('path');

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(express.static('public'))
//app.use('/static', express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use("/api",appRoutes);

//Mongo Database
mongoose.connect('mongodb://localhost:27017/meanT', function(err){
	if(err) {
		console.log("Not connected to the database :" + err);
	} else {
		console.log("Connected to the database");
	}

});

app.get('*', function(request, response) {

	console.log("dir name " + __dirname);
	//response.end("dir name " + __dirname);
	response.sendFile('index.html', { root: path.join(__dirname, './public/app/views')});
	//response.sendFile(path.join(__dirname, '/public/app/views/index.html'))
});

//Server
app.listen(port, function () {
	console.log("listening again at " + port);
});


