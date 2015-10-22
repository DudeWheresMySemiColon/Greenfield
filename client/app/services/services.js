angular.module('app.services', [])

.factory('Auth', function($http, $location, $window) {

	var signup = function(user) {
		return $http({
			method: 'POST',
			url: '/api/users/customer/post/signup',
			data: user
		})
		.then(function(resp) {
			return resp.data.token;
		});
	};

	var signin = function(user) {
		return $http({
			method: 'POST',
			url: '/api/users/customer/post/signin',
			data: user
		})
		.then(function(resp) {
			return resp.data.token;
		});
	};

	var signout = function() {
		$window.localStorage.removeItem('com.semicolon');
    	$location.path('/signin');
	};

	var isAuth = function() {
		return !!$window.localStorage.getItem('com.semicolon');
	};

	return {
		signup: signup,
		signin: signin,
		signout: signout,
		isAuth: isAuth
	};

})