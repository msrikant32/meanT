angular.module('userControllers',['userServices'])

.controller('regCtrl', function($http, $location, $timeout, User) {
	var app = this;
	this.regUser = function(regData) {
		app.errorMessage = false;
		app.successMessage = false;
		app.loading = true;

		User.create(this.regData)
		.then(function(resp) {
			console.log(resp);
			if(resp.data.success) {
				app.successMessage = resp.data.message;
				app.loading = false;
				$timeout(function(){
					$location.path('/');
				}, 1000);
			} else {
				app.errorMessage = resp.data.message;
				app.loading = false;
			}
		});
	}
});