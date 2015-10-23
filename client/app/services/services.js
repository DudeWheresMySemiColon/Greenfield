angular.module('foodly.services', [])

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

.factory('Meals', function($http) {

	var getMeals = function() {
		return $http({
			method: 'GET',
			url: '/api/users/customer/get/meals'
		})
		.then(function(resp) {
			console.log('response',resp)
			return resp.data;
		});
	};

	var addMeal = function(meal) {
		return $http({
			method: 'POST',
			url: '/api/users/vendors/post/meal',
			data: meal
		});
	};

	return {
		getMeals: getMeals,
		addMeal: addMeal
	};

})