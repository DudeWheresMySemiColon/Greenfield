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

	var getUsername = function() {
		return $window.localStorage.getItem('com.semicolon.name');
	};

	return {
		signup: signup,
		signin: signin,
		signout: signout,
		isAuth: isAuth,
		getUsername: getUsername
	};

})

.factory('Meals', function($http) {

	var getMeals = function() {
		return $http({
			method: 'GET',
			url: '/api/users/customer/get/meals'
		})
		.then(function(resp) {
			console.log('response',resp.data)
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
	var mealToOrder = {orders: [{username: "Michael", title: "Taco", price: 7,description: "Try my taco tacos"}]};

	var cartOrder = function(meal) {
		mealToOrder = meal;
	};

	var emailObject = function(mealToOrder) {
	  return {
	    to: "order.orders[0].email", // vendor email address
	    subject: "New order: order.orders[0].description",
	    text: "You have received a new order for  order.orders[0].description +  for a price of + order.orders[0].price + to be delivered to + user.address"
	  }
	};

	// $(document).ready(function() {
	//     var from, to, subject, text;
	//     $("#send_email").click(function() {
	//         to = $("#to").val();
	//         subject = $("#subject").val();
	//         text = $("#content").val();
	//         $("#message").text("Sending E-mail to vendor...Please wait");
	//         $.get("http://0.0.0.0:3000/send", {
	//             to: to,
	//             subject: subject,
	//             text: text
	//         }, function(data) {
	//             if (data == "sent") {
	//                 $("#message").empty().html("Email is been sent at " + to + " . Please check inbox !");
	//             }

	//         });
	//     });
	// });



	var submitOrder = function(mealToOrder) {
		console.log(mealToOrder)
		$.get("http://localhost:3000/send", emailObject, function(data) {
	            if (data == "sent") {
	               console.log(data + "Email is been sent at " + to + " . Please check inbox !");
	            }
	        });
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