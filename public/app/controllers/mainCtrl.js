angular.module('mainControllers',['authServices'])
.controller('mainCtrl', function($http, $location, $timeout, Auth){
	console.log("Form submitted")
	var app = this;
	this.doLogin = function(loginData) {
		app.errorMessage = false;
		app.successMessage = false;
		app.loading = true;

		Auth.login(this.loginData)
		.then(function(resp) {
			console.log(resp);
			if(resp.data.success) {
				app.successMessage = resp.data.message;
				app.loading = false;
				$timeout(function(){
					$location.path('/about');
				}, 1000);
			} else {
				app.errorMessage = resp.data.message;
				app.loading = false;
			}
		});
	}
})