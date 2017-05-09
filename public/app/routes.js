angular.module('appRouters',['ngRoute'])


.config(function($routeProvider,$locationProvider) {
	//console.log("TEsting userApp routes");
	
	$routeProvider.
	
	when('/', {
		templateUrl: 'app/views/pages/home.html'
	}).
	
	when('/about', {
		templateUrl: 'app/views/pages/about.html'
	}).
	
	when('/register', {
		templateUrl	:	'app/views/pages/users/register.html',
		controller	:	'regCtrl',
		controllerAs:	'register'
	}).
	
	when('/login', {
		templateUrl	:	'app/views/pages/users/login.html'
	}).
	
	otherwise({
		redirectTo: '/'
	});
	
	// use the HTML5 History API
    $locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
