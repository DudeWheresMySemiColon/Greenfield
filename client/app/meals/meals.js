angular.module('foodly.meals', [])

.controller('MealController', function($scope, $location, $window,Meals, Order, Auth, Counter) {


	$scope.data = []; //meals available for purchase
	$scope.meal = {}; //meal to add
	$scope.order = {orders: []};
	$scope.count = Counter;
	
	//this code block is used to generate random reviews for our product demo -
	//unfortunately, more intuitive implementations will cause a digest overflow.
	$scope.randReviews = [];
	$scope.randStars = [];
	(function() {
		for(var i = 0; i < 25; i++) {
			$scope.randReviews[i] = Math.floor(Math.random() * 15) + 1;
			var max = 5, min = 4;
			$scope.randStars[i] = Math.floor(Math.random() * (max - min + 1)) + min;
		}
	})();

	var order = $window.localStorage.getItem('order') || JSON.stringify({orders: []})
	$window.localStorage.setItem('order', order);
	$scope.count =  Counter;
	$scope.getMeals = function() {
		Meals.getMeals()
			.then(function(data) {
				$scope.data = data;
			})
			.catch(function(err) {
				console.log(err);
			});
	};
	$scope.getMeals(); // must be called for initial page load


	$scope.addMeal = function() {
		$scope.meal.url = angular.element( document.querySelector( '#preview' ) )[0].currentSrc
		Meals.addMeal({meals: [$scope.meal], username: Auth.getUsername()})
			.then(function() {
				console.log($scope.meal.description, 'sent to server.');
				$location.path('/'); //added successfully
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	$scope.checkOut = function(){
		if(Counter.number === 0){
			alert("Please order something before checking out")
		}else{
			$location.path('/order');
		}
	};



	//ng-click will activate this. order will
	//be retrieved from ng-model
	$scope.orderMeal = function(meal) {
		meal.meals.username = Auth.getUsername();
		var order = JSON.parse($window.localStorage.getItem("order"));
		console.log(meal);
		order.orders.push(meal.meals);
		$window.localStorage.setItem('order',JSON.stringify(order));
		Counter.number++;
	};

})