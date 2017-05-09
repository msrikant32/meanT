
var User = require('../models/user');

module.exports = function(router) {
	//http://localhost:3000/api/{param}
	router.get('/home', function (req, res) {
	  res.send('Welcome Home again');
	});

	//USER REGISTRATION
	//http://localhost:3000/api/users
	router.post('/users', function (req, res) {
	  var user =  new User();
	  
	  user.userName = 	req.body.userName; 
	  user.password = 	req.body.password; 
	  user.email 	=  	req.body.email; 
	  
	  if (user.userName == null || user.userName == '') {
		//res.send("Ensure User name, password and Email are provided.");
		res.json({success: false , message: "Ensure User name, password and Email are provided."});
	  } else {
		  user.save( function(err){
				if (err) {
					//res.send(err); 
					res.json({success: false , message: "Username or email already exists!"});
				} else {
					//res.send('Testing user has been created and user name is ' + user.userName);
					res.json({success: true , message: "User created"});
				}
		  });
	  }
	});
	
	//USER REGISTRATION
	//http://localhost:3000/api/authenticate
	router.post('/authenticate', function (req, res) {
		User.findOne({	userName: req.body.userName }).select('email userName password').exec(function(err, userData){
			if(err) throw err;
			
			if(!userData){
				res.json({success: false , message: "Could not authenticate user"});
			} else if(userData) {
				if(req.body.password) {
					var validPassword = userData.comparePossword(req.body.password);
				} else {
					res.json({success: false , message: "No Password Provided"});
				}
				if(!validPassword) {
					res.json({success: false , message: "Could not authenticate password"});
				} else {
					res.json({success: true , message: "User authenticate."})
				}
			}
		})
	});
	
	return router;
}