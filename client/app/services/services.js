angular.module('foodly.services', [])

.factory('Auth', function($http, $location, $window) {
	var loginorout = "Sign in";
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
		$window.localStorage.removeItem('com.semicolon.name');
		$window.localStorage.removeItem('com.semicolon.date')
    	$location.path('/signin');
	};

	var isAuth = function() {
		if(!window.localStorage.getItem('com.semicolon')){
			return false;
		}
		loginorout = "Logout"
		if(new Date() - Date.parse($window.localStorage.getItem('com.semicolon.date'))>1800000){
			$window.localStorage.removeItem('com.semicolon');
			$window.localStorage.removeItem('com.semicolon.name');
			$window.localStorage.removeItem('com.semicolon.date');
		}else{
			$window.localStorage.setItem('com.semicolon.date', new Date());			
		}
		return true;
	};

	var getUsername = function() {
		var username = $window.localStorage.getItem('com.semicolon.name') || "guest";
		return username;
	};

	return {
		signup: signup,
		signin: signin,
		signout: signout,
		isAuth: isAuth,
		getUsername: getUsername,
		loginorout: loginorout
	};

})

.factory('Meals', function($http) {

	var getMeals = function() {
		return $http({
			method: 'GET',
			url: '/api/users/customer/get/meals'
		})
		.then(function(resp) {
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

	var addOrder = function(meal) {
		return $http({
			method: 'POST',
			url: '/api/users/customer/post/orders',
			data: meal
		})
	};

	return {
		getMeals: getMeals,
		addMeal: addMeal
	};

})

.factory('Order', function($http) {
	//This data is for experimental purposes only. Needs to be put in via meals html to work
	var mealToOrder = {orders: []};

	var cartOrder = function(meal) {
		mealToOrder = meal;
	};

	var submitOrder = function(mealToOrder) {
		console.log("I'm a meal to order", mealToOrder)
		return $http({
			method: 'POST',
			url: '/api/users/customer/post/orders',
			data: mealToOrder
		});
	};

	var getMealOrder = function() {
		return mealToOrder;
	};

	return {
		cartOrder: cartOrder,
		submitOrder: submitOrder,
		getMealOrder: getMealOrder
	};

})

.factory('Counter',function(){
      var count = {
        'number': 0
      };
     return count;
})
.factory('Counter',function($window){
	var number =  $window.localStorage.getItem('order') || 0;
	if(typeof number !== "number"){
		number = JSON.parse(number).orders.length;
	}

     return  {number: number}
})

