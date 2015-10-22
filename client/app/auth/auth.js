angular.module('foodly.auth', [])

.controller('AuthController', function($scope, $window, $location, Auth) {

	$scope.user = {}; //this is attached to ng-model in the view

	$scope.signup = function() {
		Auth.signup($scope.user)
			.then(function(token) {
				$window.localStorage.setItem('com.semicolon', token);
        		$location.path('/');
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	$scope.signin = function() {
		Auth.signin($scope.user)
			.then(function(token) {
				$window.localStorage.setItem('com.semicolon', token);
        		$location.path('/');
			})
			.catch(function(err) {
				console.log(err);
			});
	};	

})