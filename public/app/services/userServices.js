angular.module('userServices',[])

.factory('User',function($http) {
console.log("testing user service");
	userFactory ={};
	
	userFactory.create = function(regData){
		return $http.post('/api/users', regData)
	};
	
	return userFactory;
});